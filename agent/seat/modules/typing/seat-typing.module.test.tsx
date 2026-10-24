import { expect, test } from "bun:test"
import {
  beatDue,
  nextLapse,
  othersTyping,
  replyingSaid,
  TYPING_BEAT_MS,
  TYPING_HELD_MS,
  type Typing,
  typingAfter,
  typingIn,
  typingSaid,
} from "akasha/agent/seat/modules/typing/seat-typing.module.code.tsx"
import { idle } from "akasha/agent/seat/turn-state/pages/idle/idle.seat-turn-state.ts"
import { working } from "akasha/agent/seat/turn-state/pages/working/working.seat-turn-state.ts"
import { seatTurnState } from "akasha/agent/seat/turn-state/seat-turn-state.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { alan } from "akasha/person/pages/alan/alan.person.ts"
import { jenny } from "akasha/person/pages/jenny/jenny.person.ts"
import { person } from "akasha/person/person.page-type.ts"
import { claudius } from "akasha/persona/pages/claudius/claudius.persona.ts"
import { persona } from "akasha/persona/persona.page-type.ts"

const NOW = Date.parse("2026-10-24T22:30:00.000Z")

const ALAN = namedAs(person.slug, alan.slug, null)

const JENNY = namedAs(person.slug, jenny.slug, null)

const CLAUDIUS = namedAs(persona.slug, claudius.slug, null)

const JENNY_TYPING: Typing = { person: JENNY, at: "2026-10-24T22:29:59.000Z" }

const ALAN_TYPING: Typing = { person: ALAN, at: "2026-10-24T22:29:58.000Z" }

test("only entries naming a person and an instant are read", () => {
  const read = typingIn([JENNY_TYPING, { person: ALAN }, { at: JENNY_TYPING.at }, "x", null])
  expect(read).toEqual([JENNY_TYPING])
  expect(typingIn(undefined)).toEqual([])
})

test("a heartbeat replaces that person's entry and drops lapsed ones", () => {
  const lapsed: Typing = { person: JENNY, at: new Date(NOW - TYPING_HELD_MS - 1).toISOString() }
  expect(typingAfter([lapsed, ALAN_TYPING], ALAN, true, NOW)).toEqual([
    { person: ALAN, at: new Date(NOW).toISOString() },
  ])
})

test("a stop takes only that person's entry away", () => {
  expect(typingAfter([JENNY_TYPING, ALAN_TYPING], ALAN, false, NOW)).toEqual([JENNY_TYPING])
})

test("the reader never sees their own typing", () => {
  expect(othersTyping([JENNY_TYPING, ALAN_TYPING], alan.slug, NOW)).toEqual([jenny.slug])
  expect(othersTyping([JENNY_TYPING, ALAN_TYPING], jenny.slug, NOW)).toEqual([alan.slug])
})

test("nobody is shown typing until the reader is known", () => {
  expect(othersTyping([JENNY_TYPING, ALAN_TYPING], null, NOW)).toEqual([])
})

test("typing lapses eight seconds after the last heartbeat", () => {
  const lapsed: Typing = { person: JENNY, at: new Date(NOW - TYPING_HELD_MS).toISOString() }
  expect(othersTyping([lapsed], alan.slug, NOW)).toEqual([])
  expect(nextLapse([JENNY_TYPING, ALAN_TYPING], NOW)).toBe(NOW - 2_000 + TYPING_HELD_MS)
  expect(nextLapse([lapsed], NOW)).toBeNull()
})

test("the persons typing are named", () => {
  expect(typingSaid([])).toBeNull()
  expect(typingSaid([jenny.slug])).toBe("Jenny is typing")
  expect(typingSaid([jenny.slug, alan.slug])).toBe("Jenny and Alan are typing")
})

test("the persona is named replying only while the seat works", () => {
  const workingState = namedAs(seatTurnState.slug, working.slug, null)
  const idleState = namedAs(seatTurnState.slug, idle.slug, null)
  expect(replyingSaid(workingState, CLAUDIUS)).toBe("Claudius is replying")
  expect(replyingSaid(idleState, CLAUDIUS)).toBeNull()
  expect(replyingSaid(null, CLAUDIUS)).toBeNull()
})

test("a heartbeat goes at most every three seconds", () => {
  expect(beatDue(null, NOW)).toBe(true)
  expect(beatDue(NOW - TYPING_BEAT_MS + 1, NOW)).toBe(false)
  expect(beatDue(NOW - TYPING_BEAT_MS, NOW)).toBe(true)
})
