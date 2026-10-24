import { expect, test } from "bun:test"
import {
  excerptOf,
  type Heard,
  lastReply,
  noticed,
  type Said,
} from "akasha/agent/seat/modules/reply-notifying/seat-reply-notifying.module.code.tsx"
import { saidOnly } from "akasha/agent/seat/observation/modules/conversation-shaping/conversation-shaping.computed-property-module.code.ts"
import { ready } from "akasha/agent/seat/turn-state/pages/idle/ready/ready.seat-turn-state.ts"
import { working } from "akasha/agent/seat/turn-state/pages/working/working.seat-turn-state.ts"
import { seatTurnState } from "akasha/agent/seat/turn-state/seat-turn-state.page-type.ts"

const OPENED = Date.parse("2026-10-24T19:00:00.000Z")

const ASKED = {
  kind: "person",
  sender: "alan",
  text: "How are we doing?",
  at: "2026-10-24T18:50:00.000Z",
}

const ASKED_AGAIN = {
  kind: "person",
  sender: "jenny",
  text: "And now?",
  at: "2026-10-24T19:01:00.000Z",
}

const TOOL: Said = { kind: "tool", line: "Read notes.md", at: "2026-10-24T19:01:10.000Z" }

const BEFORE: Said = { kind: "agent", text: "Earlier words.", at: "2026-10-24T18:55:00.000Z" }

const ANSWERED: Said = {
  kind: "agent",
  text: "You are **both** doing the work.",
  at: "2026-10-24T19:01:20.000Z",
}

const ENDED: Said = { kind: "turn-end", line: "Worked for 20s", at: "2026-10-24T19:01:21.000Z" }

const READY = `${seatTurnState.slug}/${ready.slug}`

const WORKING = `${seatTurnState.slug}/${working.slug}`

function heard(entries: readonly Said[], turnState: string | null = READY): Heard {
  return { entries, turnState }
}

test("a page opening on a reply already finished notifies nothing", () => {
  const now = noticed(null, OPENED, lastReply(heard([ASKED, BEFORE, ENDED])))
  expect(now.reply).toBeNull()
  expect(now.settled).not.toBeNull()
})

test("a reply finishing after the page opened notifies once with the reply's start", () => {
  const opened = noticed(null, OPENED, lastReply(heard([ASKED, BEFORE])))
  const said = heard([ASKED, BEFORE, ASKED_AGAIN, TOOL, ANSWERED, ENDED])
  const done = noticed(opened.settled, OPENED, lastReply(said))
  expect(done.reply?.excerpt).toBe("You are both doing the work.")
  expect(noticed(done.settled, OPENED, lastReply(said)).reply).toBeNull()
})

test("a reply notifies only once its seat's turn is over", () => {
  const said = [ASKED, BEFORE, ASKED_AGAIN, ANSWERED]
  expect(lastReply(heard(said, WORKING))).toBeNull()
  expect(lastReply(heard(said, null))).toBeNull()
  expect(lastReply(heard(said))?.excerpt).toBe("You are both doing the work.")
})

test("a person's words after the last reply leave nothing finished", () => {
  expect(lastReply(heard([ASKED, BEFORE, ASKED_AGAIN]))).toBeNull()
})

test("a page drawn again after the reply came still notifies that reply", () => {
  const said = heard([ASKED, BEFORE, ASKED_AGAIN, ANSWERED])
  expect(noticed(null, OPENED, lastReply(said)).reply).not.toBeNull()
})

test("a person who sees only what was said is notified of the same reply", () => {
  const said = [ASKED, BEFORE, ASKED_AGAIN, TOOL, ANSWERED, ENDED]
  const whole = lastReply(heard(said))
  const seen = lastReply(heard(saidOnly(said) as readonly Said[]))
  expect(saidOnly(said)).toHaveLength(4)
  expect(whole).not.toBeNull()
  expect(seen).toEqual(whole)
})

test("an excerpt drops markdown and stays short", () => {
  expect(excerptOf("# Hi\n\nSee [the notes](https://x.y) `now`")).toBe("Hi See the notes now")
  const long = excerptOf("word ".repeat(100))
  expect(long.length).toBeLessThanOrEqual(140)
  expect(long.endsWith("…")).toBe(true)
})
