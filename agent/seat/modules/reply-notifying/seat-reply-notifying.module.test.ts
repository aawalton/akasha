import { expect, test } from "bun:test"
import {
  excerptOf,
  lastEnded,
  noticed,
  type Said,
} from "akasha/agent/seat/modules/reply-notifying/seat-reply-notifying.module.code.tsx"

const ASKED: Said = { kind: "person", text: "How are we doing?" }

const TOOL: Said = { kind: "tool", line: "Read notes.md" }

const ANSWERED: Said = { kind: "agent", text: "You are **both** doing the work." }

const ENDED: Said = { kind: "turn-end", line: "Worked for 2m", at: "2026-10-24T19:00:00.000Z" }

const ENDED_AGAIN: Said = {
  kind: "turn-end",
  line: "Worked for 1m",
  at: "2026-10-24T19:05:00.000Z",
}

test("a page opening on a turn already ended notifies nothing", () => {
  const now = noticed(undefined, [ASKED, ANSWERED, ENDED])
  expect(now.reply).toBeNull()
  expect(now.seen).not.toBeNull()
})

test("a turn ending after the page opened notifies once with the reply's start", () => {
  const opened = noticed(undefined, [ASKED])
  expect(opened.reply).toBeNull()
  const ended = noticed(opened.seen, [ASKED, TOOL, ANSWERED, ENDED])
  expect(ended.reply?.excerpt).toBe("You are both doing the work.")
  expect(noticed(ended.seen, [ASKED, TOOL, ANSWERED, ENDED]).reply).toBeNull()
})

test("a reply still streaming notifies nothing until its turn ends", () => {
  const opened = noticed(undefined, [ASKED, ANSWERED, ENDED])
  const asked = noticed(opened.seen, [ASKED, ANSWERED, ENDED, ASKED])
  expect(asked.reply).toBeNull()
  const streaming = noticed(asked.seen, [ASKED, ANSWERED, ENDED, ASKED, ANSWERED])
  expect(streaming.reply).toBeNull()
  const done = noticed(streaming.seen, [ASKED, ANSWERED, ENDED, ASKED, ANSWERED, ENDED_AGAIN])
  expect(done.reply).not.toBeNull()
})

test("a turn with no words of its own notifies with no excerpt", () => {
  expect(lastEnded([ASKED, ANSWERED, ENDED, ASKED, TOOL, ENDED_AGAIN])?.excerpt).toBe("")
})

test("a conversation with no turn ended has nothing ended", () => {
  expect(lastEnded([ASKED, ANSWERED])).toBeNull()
})

test("an excerpt drops markdown and stays short", () => {
  expect(excerptOf("# Hi\n\nSee [the notes](https://x.y) `now`")).toBe("Hi See the notes now")
  const long = excerptOf("word ".repeat(100))
  expect(long.length).toBeLessThanOrEqual(140)
  expect(long.endsWith("…")).toBe(true)
})
