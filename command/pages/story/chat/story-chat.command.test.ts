import { expect, test } from "bun:test"
import { appendLines } from "akasha/change/mechanical/file-content/append-lines/append-lines.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  askedFor,
  chatLine,
  storyChat,
} from "akasha/command/pages/story/chat/story-chat.command.code.ts"

const AT = "2026-10-27T19:00:00.000Z"

const APPEND = `${changeMechanicalFileContent.slug}/${appendLines.slug}`

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "story chat",
  from: "/nowhere",
  agentId: null,
  writer: "Mari <mari@alanwalton.com>",
}

test("a message is one json line holding when, who and what", () => {
  expect(JSON.parse(chatLine("mari", "two hours", AT))).toEqual({
    at: AT,
    from: "mari",
    body: "two hours",
  })
  expect(chatLine("mari", "two hours", AT).endsWith("\n")).toBe(true)
})

test("a message is appended to the chat rather than written over it", () => {
  const asked = askedFor("a/b.story-played.chat.jsonl", "mari", "yes", AT)
  expect(asked.map((one): string => one.at)).toEqual([APPEND])
})

test("a call appends the body to the story's chat as the calling seat", async () => {
  const landed: Asking[][] = []
  const answer = await storyChat(
    ["--story", "test-story", "--body", " It is two hours to dawn. "],
    GIVEN,
    async (_root, asked) => {
      landed.push([...asked])
      return { commit: "c0ffee", landed: [] } as never
    },
    (_root, story) => (story === "test-story" ? "s/test-story.story-played.chat.jsonl" : null),
    "mari-roleplay-test-story"
  )
  expect(answer.code).toBe(0)
  const given = landed[0]?.[0]?.given as { readonly at: string; readonly content: string }
  expect(given.at).toBe("s/test-story.story-played.chat.jsonl")
  const line = JSON.parse(given.content) as Record<string, unknown>
  expect([line["from"], line["body"]]).toEqual([
    "mari-roleplay-test-story",
    "It is two hours to dawn.",
  ])
})

test("a story naming no story played is refused, and nothing lands", async () => {
  let landings = 0
  const answer = await storyChat(
    ["--story", "nowhere", "--body", "hello"],
    GIVEN,
    async () => {
      landings += 1
      return { commit: "c0ffee", landed: [] } as never
    },
    () => null,
    "mari"
  )
  expect(answer.code).not.toBe(0)
  expect(landings).toBe(0)
})

test("a message saying nothing is refused", async () => {
  const answer = await storyChat(
    ["--story", "test-story", "--body", "   "],
    GIVEN,
    async () => ({ commit: "c0ffee", landed: [] }) as never,
    () => "s/test-story.story-played.chat.jsonl",
    "mari"
  )
  expect(answer.code).not.toBe(0)
})
