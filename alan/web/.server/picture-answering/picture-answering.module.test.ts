import { expect, test } from "bun:test"
import {
  announcePicture,
  answerPicture,
  answerPictureAsked,
  deliverToSeat,
  type PictureEffects,
  pictureBody,
  unannouncedWhy,
} from "akasha/alan/web/.server/picture-answering/picture-answering.module.code.ts"
import type {
  Fetcher,
  Sleeper,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  asAccount,
  asContributor,
} from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"

const CAPACITOR = "capacitor://localhost"

const ALAN_ACCOUNT = "9ba554f7-cb18-48bb-a709-ec935a895ca7"

const ID = "0199c2a4-2f3e-7000-8000-0123456789ab"

const AT = "2026-09-13T20:11:04.000Z"

const JPEG = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46])

const noNap: Sleeper = async () => {}

function asked(
  bytes: Uint8Array,
  headers: Record<string, string> = { "content-type": "image/jpeg", origin: CAPACITOR },
  method = "POST"
): Request {
  const held = new Map(Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value]))
  return {
    method,
    headers: { get: (name: string) => held.get(name.toLowerCase()) ?? null },
    arrayBuffer: async () => bytes.slice().buffer,
  } as Request
}

type Kept = { readonly id: string; readonly bytes: Uint8Array }

type Delivered = { readonly to: string; readonly body: string }

function effectsWith(over: Partial<PictureEffects> = {}) {
  const kept: Kept[] = []
  const delivered: Delivered[] = []
  const recorded: string[] = []
  const detached: Promise<void>[] = []
  const effects: PictureEffects = {
    admit: async () => ({ outcome: "admitted", whom: asAccount(ALAN_ACCOUNT) }),
    signedIn: async () => null,
    enrol: async () => ({ ok: true, personSlug: "alan" }),
    keep: async (id, bytes) => {
      kept.push({ id, bytes })
    },
    deliver: async (to, body) => {
      delivered.push({ to, body })
      return null
    },
    record: async (why) => {
      recorded.push(why)
    },
    detach: (work) => {
      detached.push(work)
    },
    now: () => new Date(AT),
    mint: () => ID,
    ...over,
  }
  const settled = async (): Promise<void> => {
    await Promise.all(detached)
  }
  return { effects, kept, delivered, recorded, settled }
}

test("a caller the device secrets refuse is refused", async () => {
  const { effects } = effectsWith({ admit: async () => ({ outcome: "refused" }) })
  expect((await answerPicture(asked(JPEG), effects)).status).toBe(401)
})

test("a signed-in contributor is taken without the device secrets being read", async () => {
  let admitted = false
  const asWhom: string[] = []
  const { effects } = effectsWith({
    signedIn: async () => ({ contributor: "contributor-abc", subjectHash: "" }),
    admit: async () => {
      admitted = true
      return { outcome: "refused" }
    },
    enrol: async (whom) => {
      asWhom.push(JSON.stringify(whom))
      return { ok: true, personSlug: "alan" }
    },
  })
  expect((await answerPicture(asked(JPEG), effects)).status).toBe(200)
  expect(admitted).toBe(false)
  expect(asWhom).toEqual([JSON.stringify(asContributor("contributor-abc"))])
})

test("a contributor no person names is refused rather than answered", async () => {
  const { effects, kept } = effectsWith({
    signedIn: async () => ({ contributor: "contributor-abc", subjectHash: "" }),
    enrol: async () => ({ ok: false, unread: false, why: "no person states the contributor" }),
  })
  expect((await answerPicture(asked(JPEG), effects)).status).toBe(403)
  expect(kept).toEqual([])
})

test("a caller with neither a session nor a device secret is refused", async () => {
  const { effects, kept } = effectsWith({
    signedIn: async () => null,
    admit: async () => ({ outcome: "refused" }),
  })
  expect((await answerPicture(asked(JPEG), effects)).status).toBe(401)
  expect(kept).toEqual([])
})

test("a caller the device secrets could not be read for is told to try again", async () => {
  const { effects, kept } = effectsWith({ admit: async () => ({ outcome: "unread" }) })
  const answered = await answerPicture(asked(JPEG), effects)
  expect(answered.status).toBe(503)
  expect((await answered.json()).retryable).toBe(true)
  expect(kept).toEqual([])
})

test("a body that is not a jpeg is refused before anything is kept", async () => {
  const { effects, kept } = effectsWith()
  const answered = await answerPicture(
    asked(JPEG, { "content-type": "application/json", origin: CAPACITOR }),
    effects
  )
  expect(answered.status).toBe(415)
  expect(kept).toEqual([])
})

test("a jpeg said with a charset is still a jpeg", async () => {
  const { effects } = effectsWith()
  const answered = await answerPicture(
    asked(JPEG, { "content-type": "image/jpeg; charset=binary", origin: CAPACITOR }),
    effects
  )
  expect(answered.status).toBe(200)
})

test("a body holding no bytes is refused", async () => {
  const { effects, kept } = effectsWith()
  expect((await answerPicture(asked(new Uint8Array(0)), effects)).status).toBe(400)
  expect(kept).toEqual([])
})

test("no object store is told as something to try again", async () => {
  const { effects, delivered } = effectsWith({ keep: null })
  const answered = await answerPicture(asked(JPEG), effects)
  expect(answered.status).toBe(503)
  expect(delivered).toEqual([])
})

test("an account no person states is refused", async () => {
  const { effects, kept } = effectsWith({
    enrol: async () => ({ ok: false, unread: false, why: "no person states the account" }),
  })
  expect((await answerPicture(asked(JPEG), effects)).status).toBe(403)
  expect(kept).toEqual([])
})

test("the picture is kept under the minted id and the person's seat is told that id", async () => {
  const { effects, kept, delivered, settled } = effectsWith()
  const answered = await answerPicture(asked(JPEG), effects)
  expect(answered.status).toBe(200)
  expect(await answered.json()).toEqual({ ok: true, id: ID, to: "alan" })
  expect(kept).toHaveLength(1)
  expect(kept[0]?.id).toBe(ID)
  expect(Array.from(kept[0]?.bytes ?? [])).toEqual(Array.from(JPEG))
  await settled()
  expect(delivered).toEqual([{ to: "alan", body: pictureBody("alan", ID, AT) }])
  expect(delivered[0]?.body).toContain(`akasha alan picture ${ID}`)
})

test("the answer comes back before the message is written", async () => {
  let release: () => void = () => {}
  const held = new Promise<void>((settle) => {
    release = settle
  })
  const { effects, kept, delivered, settled } = effectsWith({
    deliver: async () => {
      await held
      return null
    },
  })
  const answered = await answerPicture(asked(JPEG), effects)
  expect(answered.status).toBe(200)
  expect(kept).toHaveLength(1)
  expect(delivered).toEqual([])
  release()
  await settled()
})

test("a picture the store would not keep tells nobody", async () => {
  const { effects, delivered } = effectsWith({
    keep: async () => {
      throw new Error("SeaweedFS S3 PUT failed")
    },
  })
  const answered = await answerPicture(asked(JPEG), effects)
  expect(answered.status).toBe(503)
  expect((await answered.json()).error).toContain("SeaweedFS S3 PUT failed")
  expect(delivered).toEqual([])
})

test("a message the pages refused still answers the phone that the picture is kept", async () => {
  const { effects, settled } = effectsWith({
    deliver: async () => "no seat holds the name `alan`",
  })
  const answered = await answerPicture(asked(JPEG), effects)
  expect(answered.status).toBe(200)
  expect(await answered.json()).toEqual({ ok: true, id: ID, to: "alan" })
  await settled()
})

test("a message that did not land is recorded, naming the id and how to reach the picture", async () => {
  const { effects, recorded, settled } = effectsWith({
    deliver: async () => "no seat holds the name `alan`",
  })
  await answerPicture(asked(JPEG), effects)
  await settled()
  expect(recorded).toHaveLength(1)
  expect(recorded[0]).toBe(unannouncedWhy("alan", ID, "no seat holds the name `alan`"))
  expect(recorded[0]).toContain(ID)
  expect(recorded[0]).toContain(`akasha alan picture ${ID}`)
})

test("a deliver that threw is recorded rather than lost", async () => {
  const recorded: string[] = []
  await announcePicture(
    {
      deliver: async () => {
        throw new Error("the page store dropped the call")
      },
      record: async (why) => {
        recorded.push(why)
      },
    },
    "alan",
    ID,
    "a body"
  )
  expect(recorded[0]).toContain("the page store dropped the call")
  expect(recorded[0]).toContain(ID)
})

test("a record that threw does not throw out of the announcement", async () => {
  await announcePicture(
    {
      deliver: async () => "refused",
      record: async () => {
        throw new Error("the errors store is down too")
      },
    },
    "alan",
    ID,
    "a body"
  )
})

test("a message that landed records nothing", async () => {
  const { effects, recorded, settled } = effectsWith()
  await answerPicture(asked(JPEG), effects)
  await settled()
  expect(recorded).toEqual([])
})

test("an answer to the native shell carries the cross-origin headers that shell needs", async () => {
  const { effects } = effectsWith()
  const answered = await answerPicture(asked(JPEG), effects)
  expect(answered.headers.get("Access-Control-Allow-Origin")).toBe(CAPACITOR)
  expect(answered.headers.get("Access-Control-Allow-Headers")).toContain("X-Device-Secret")
})

test("a preflight is answered empty and a read is refused", () => {
  expect(answerPictureAsked(asked(JPEG, { origin: CAPACITOR }, "OPTIONS")).status).toBe(204)
  expect(answerPictureAsked(asked(JPEG, { origin: CAPACITOR }, "GET")).status).toBe(405)
})

type Sent = { readonly at: string; readonly body: Record<string, unknown> }

function pagesHolding(seats: readonly string[], refusing: string | null = null) {
  const sent: Sent[] = []
  const fetcher: Fetcher = async (url, init) => {
    const body = JSON.parse(String(init.body)) as Record<string, unknown>
    sent.push({ at: url, body })
    if (url.endsWith("/ask")) {
      return Response.json({ rows: seats.map((slug) => ({ slug })) })
    }
    if (refusing !== null) return Response.json({ refused: refusing })
    return Response.json({ wrote: ["one"], commit: "abc" })
  }
  return { fetcher, sent }
}

test("a seat nobody holds is refused rather than written to", async () => {
  const { fetcher, sent } = pagesHolding(["amy"])
  const refused = await deliverToSeat("alan", "a body", fetcher, noNap)
  expect(refused).toContain("no seat holds the name `alan`")
  expect(sent.filter((one) => one.at.endsWith("/write"))).toEqual([])
})

test("a seat somebody holds is written a message carrying the body", async () => {
  const { fetcher, sent } = pagesHolding(["alan", "amy"])
  expect(await deliverToSeat("alan", "a body", fetcher, noNap)).toBeNull()
  const wrote = sent.find((one) => one.at.endsWith("/write"))
  const pages = wrote?.body.pages as readonly { values: Record<string, unknown> }[]
  expect(pages[0]?.values.to).toBe("alan")
  expect(pages[0]?.values.body).toBe("a body")
  expect(pages[0]?.values.from).toBe("alanwalton-app")
})

test("a write the pages refused is answered as that refusal", async () => {
  const { fetcher } = pagesHolding(["alan"], "the pages are read only today")
  expect(await deliverToSeat("alan", "a body", fetcher, noNap)).toBe(
    "the pages are read only today"
  )
})
