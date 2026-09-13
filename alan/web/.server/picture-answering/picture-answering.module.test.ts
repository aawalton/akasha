import { expect, test } from "bun:test"
import {
  answerPicture,
  answerPictureAsked,
  deliverToSeat,
  type PictureEffects,
  pictureBody,
} from "akasha/alan/web/.server/picture-answering/picture-answering.module.code.ts"
import type {
  Fetcher,
  Sleeper,
} from "akasha/pages/service/modules/page-calling/page-calling.module.code.ts"

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
  const effects: PictureEffects = {
    admit: async () => ({ outcome: "admitted", userId: ALAN_ACCOUNT }),
    enrol: async () => ({ ok: true, personSlug: "alan" }),
    keep: async (id, bytes) => {
      kept.push({ id, bytes })
    },
    deliver: async (to, body) => {
      delivered.push({ to, body })
      return null
    },
    now: () => new Date(AT),
    mint: () => ID,
    ...over,
  }
  return { effects, kept, delivered }
}

test("a caller the device secrets refuse is refused", async () => {
  const { effects } = effectsWith({ admit: async () => ({ outcome: "refused" }) })
  expect((await answerPicture(asked(JPEG), effects)).status).toBe(401)
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
  const { effects, kept, delivered } = effectsWith()
  const answered = await answerPicture(asked(JPEG), effects)
  expect(answered.status).toBe(200)
  expect(await answered.json()).toEqual({ ok: true, id: ID, to: "alan" })
  expect(kept).toHaveLength(1)
  expect(kept[0]?.id).toBe(ID)
  expect(Array.from(kept[0]?.bytes ?? [])).toEqual(Array.from(JPEG))
  expect(delivered).toEqual([{ to: "alan", body: pictureBody("alan", ID, AT) }])
  expect(delivered[0]?.body).toContain(`akasha alan picture ${ID}`)
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

test("a message the pages refused is answered as not delivered, naming the kept id", async () => {
  const { effects } = effectsWith({ deliver: async () => "no seat holds the name `alan`" })
  const answered = await answerPicture(asked(JPEG), effects)
  expect(answered.status).toBe(503)
  const said = await answered.json()
  expect(said.error).toContain("no seat holds")
  expect(said.id).toBe(ID)
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
