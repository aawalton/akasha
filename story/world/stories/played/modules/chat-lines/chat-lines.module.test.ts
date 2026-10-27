import { expect, test } from "bun:test"
import {
  chatLine,
  chatSaidIn,
} from "akasha/story/world/stories/played/modules/chat-lines/chat-lines.module.code.ts"

const AT = "2026-10-27T19:00:00.000Z"

test("a line written is read back as said", () => {
  const text = `${chatLine("alan", "how far to dawn?", AT)}${chatLine("mari", "two hours", AT)}`
  expect(chatSaidIn(text)).toEqual([
    { at: AT, from: "alan", body: "how far to dawn?" },
    { at: AT, from: "mari", body: "two hours" },
  ])
})

test("a chat with no file reads as nothing said", () => {
  expect(chatSaidIn(null)).toEqual([])
})

test("a line that is no message is passed over rather than thrown on", () => {
  expect(chatSaidIn(`not json\n{"at":1}\n${chatLine("alan", "hi", AT)}`)).toEqual([
    { at: AT, from: "alan", body: "hi" },
  ])
})
