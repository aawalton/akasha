import { expect, test } from "bun:test"
import type { CommsRule } from "../seat-wake-rules/seat-wake-rules.module.code.ts"
import { decideSeatWake, decideWakeMatch } from "./seat-wake-match-decide.module.code.ts"

const RULE: CommsRule = {
  id: "rule-1",
  senderMatch: "alan",
  contentRegex: undefined,
  target: "scribe",
  status: "LIVE",
}

const FROM_ALAN = { sender: "alan", content: "come back" }

test("a seat with no wake sources at all is not armed", () => {
  expect(decideSeatWake({ wakeSources: null, comms: FROM_ALAN })).toEqual({ kind: "not-armed" })
})

test("an armed seat whose rule matches names the rule that matched", () => {
  expect(decideSeatWake({ wakeSources: [RULE], comms: FROM_ALAN })).toEqual({
    kind: "armed-matched",
    ruleId: "rule-1",
  })
})

test("an armed seat that matched nothing reports what it does listen for", () => {
  const said = decideSeatWake({
    wakeSources: [RULE],
    comms: { sender: "someone-else", content: "x" },
  })
  expect(said).toEqual({ kind: "armed-unmatched", declared: ["alan"] })
})

test("a seat whose page stands needs no waking", () => {
  const said = decideWakeMatch({ seatIsAbsent: false, comms: FROM_ALAN, wakeSources: [RULE] })
  expect(said.kind).toBe("no-op")
  expect(said.reason).toContain("an agent is in it")
})

test("an absent seat whose wake source matches is revived", () => {
  const said = decideWakeMatch({ seatIsAbsent: true, comms: FROM_ALAN, wakeSources: [RULE] })
  expect(said.kind).toBe("revive")
})

test("an absent seat whose wake sources match nothing is left alone", () => {
  const said = decideWakeMatch({
    seatIsAbsent: true,
    comms: { sender: "someone-else", content: "x" },
    wakeSources: [RULE],
  })
  expect(said.kind).toBe("no-op")
  expect(said.reason).toContain("no wakeSource matched")
})

test("an absent seat armed with nothing is left alone", () => {
  expect(decideWakeMatch({ seatIsAbsent: true, comms: FROM_ALAN, wakeSources: [] }).kind).toBe(
    "no-op"
  )
})

test("the first matching rule of several is the one that wakes the seat", () => {
  const other: CommsRule = { ...RULE, id: "rule-2" }
  const said = decideSeatWake({ wakeSources: [RULE, other], comms: FROM_ALAN })
  expect(said).toEqual({ kind: "armed-matched", ruleId: "rule-1" })
})
