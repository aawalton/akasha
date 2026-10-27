import { expect, test } from "bun:test"
import type { Stated } from "akasha/alan/web/.server/action-bar-answering/action-bar-answering.module.code.ts"
import {
  type Appended,
  answerStoryChat,
  appendedTo,
  type ChatEffects,
} from "akasha/alan/web/.server/story-chat-answering/story-chat-answering.module.code.ts"
import { CHAT_SENDER } from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"
import { chatSaidIn } from "akasha/story/world/stories/played/modules/chat-lines/chat-lines.module.code.ts"

const SEAT = "mari-roleplay-test-story"

const GAME = "test-story"

const PAGE = "story/world/pages/test-world/stories/played/test-story/test-story.story-played.ts"

const CHAT =
  "story/world/pages/test-world/stories/played/test-story/test-story.story-played.chat.jsonl"

function asked(body: unknown, method = "POST") {
  const url = "https://alanwalton.com/api/story-chat"
  if (method !== "POST") return new Request(url, { method })
  return new Request(url, {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  })
}

function effectsWith(over: Partial<ChatEffects> = {}) {
  const written: Stated[] = []
  const appended: string[] = []
  const effects: ChatEffects = {
    signedIn: async () => ({ contributor: "contributor-alan", subjectHash: "alan" }),
    enrol: async () => ({ ok: true, personSlug: "alan" }),
    seatOf: async () => ({ kind: "seated", seat: SEAT, game: GAME, person: "alan" }),
    write: async (stated) => {
      written.push(stated)
      return { kind: "written", id: "agent-message-one", relPath: "at" }
    },
    make: async () => {
      throw new Error("a chat makes no turn")
    },
    pendingRows: async () => [],
    draftOf: async () => null,
    dropDraft: async () => undefined,
    append: async (_game, line): Promise<Appended> => {
      appended.push(line)
      return { ok: true }
    },
    ...over,
  }
  return { effects, written, appended }
}

test("a message is appended to the story's chat as Alan's, then told to its game master", async () => {
  const { effects, written, appended } = effectsWith()
  const answered = await answerStoryChat(
    asked({ gameExternalId: GAME, text: " how far? " }),
    effects
  )
  expect(answered.status).toBe(200)
  expect(chatSaidIn(appended.join("")).map((one) => [one.from, one.body])).toEqual([
    ["alan", "how far?"],
  ])
  expect(written).toEqual([
    { to: SEAT, from: CHAT_SENDER, warrant: "announce", body: "how far?", startedOnDemand: true },
  ])
})

test("a message the chat did not keep is told to nobody", async () => {
  const { effects, written } = effectsWith({ append: async () => ({ refused: "raced" }) })
  const answered = await answerStoryChat(asked({ gameExternalId: GAME, text: "hi" }), effects)
  expect(answered.status).toBe(503)
  expect(written).toEqual([])
})

test("a message kept that reached no game master is answered as not sent", async () => {
  const { effects, appended } = effectsWith({
    write: async () => ({ kind: "refused", detail: "no seat holds the name" }),
  })
  const answered = await answerStoryChat(asked({ gameExternalId: GAME, text: "hi" }), effects)
  expect(answered.status).toBe(503)
  expect(appended.length).toBe(1)
})

test("a caller who is not signed in is refused and nothing is kept", async () => {
  const { effects, appended } = effectsWith({ signedIn: async () => null })
  const answered = await answerStoryChat(asked({ gameExternalId: GAME, text: "hi" }), effects)
  expect(answered.status).toBe(401)
  expect(appended).toEqual([])
})

test("a message saying nothing is refused", async () => {
  const { effects } = effectsWith()
  const answered = await answerStoryChat(asked({ gameExternalId: GAME, text: "  " }), effects)
  expect(answered.status).toBe(400)
})

test("a browser's preflight is answered with nothing to do", async () => {
  const answered = await answerStoryChat(asked(null, "OPTIONS"), effectsWith().effects)
  expect(answered.status).toBe(204)
})

test("an append writes the chat whole at the commit it read, the new line last", async () => {
  const puts: { readonly path: string; readonly content: string; readonly read?: string }[] = []
  const held = '{"at":"t","from":"alan","body":"one"}\n'
  const said = await appendedTo(
    GAME,
    '{"at":"u","from":"alan","body":"two"}\n',
    async (sought) =>
      sought.pages === undefined
        ? { at: "c1", bodies: [{ path: CHAT, content: held }], unplaced: [] }
        : { at: "c1", bodies: [{ path: PAGE, content: "" }], unplaced: [] },
    async (writing) => {
      for (const one of writing.puts ?? []) puts.push({ ...one, read: writing.read })
      return { commit: "c2", wrote: [CHAT], took: [] }
    }
  )
  expect(said).toEqual({ ok: true })
  expect(puts).toEqual([
    { path: CHAT, content: `${held}{"at":"u","from":"alan","body":"two"}\n`, read: "c1" },
  ])
})
