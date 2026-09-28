import { expect, test } from "bun:test"
import {
  answerChapterWrite,
  type ChapterWriteEffects,
} from "akasha/alan/web/.server/chapter-write-answering/chapter-write-answering.module.code.ts"

const AT = "stories/hotel/chapters/hotel-0001.story-chapter-written.ts"

function effectsWith(over: Partial<ChapterWriteEffects> = {}) {
  const made: string[] = []
  const effects: ChapterWriteEffects = {
    signedIn: async () => ({ contributor: "contributor-alan", subjectHash: "alan" }),
    enrol: async () => ({ ok: true, personSlug: "alan" }),
    make: async (story) => {
      made.push(story)
      return { kind: "made", slug: "hotel-0001", at: AT, told: [], faults: [] }
    },
    ...over,
  }
  return { effects, made }
}

function asked(body: unknown): Request {
  return new Request("https://alanwalton.com/api/chapter-write", {
    method: "POST",
    body: JSON.stringify(body),
  })
}

test("Alan starts the next chapter of the story he names", async () => {
  const { effects, made } = effectsWith()
  const answered = await answerChapterWrite(asked({ story: "hotel" }), effects)
  expect(answered.status).toBe(200)
  expect(await answered.json()).toEqual({ ok: true, slug: "hotel-0001" })
  expect(made).toEqual(["hotel"])
})

test("a caller not signed in, or signed in as someone else, starts nothing", async () => {
  const nobody = effectsWith({ signedIn: async () => null })
  expect((await answerChapterWrite(asked({ story: "hotel" }), nobody.effects)).status).toBe(401)
  const other = effectsWith({ enrol: async () => ({ ok: true, personSlug: "someone-else" }) })
  expect((await answerChapterWrite(asked({ story: "hotel" }), other.effects)).status).toBe(403)
  expect([...nobody.made, ...other.made]).toEqual([])
})

test("a story with a chapter still being made is answered with why", async () => {
  const said = "The chapter `hotel-0001` is still being made. The writer is working…"
  const { effects } = effectsWith({ make: async () => ({ kind: "refused", said }) })
  const answered = await answerChapterWrite(asked({ story: "hotel" }), effects)
  expect(answered.status).toBe(409)
  expect(await answered.json()).toEqual({ ok: false, error: said })
})
