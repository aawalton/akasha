import { expect, test } from "bun:test"
import { SEAT_MODE_INTERACTIVE } from "akasha/agent/seat/launching/modules/seat-modes/seat-modes.module.code.ts"
import {
  detachedLaunch,
  promptAsked,
} from "akasha/agent/seat/launching/modules/seat-start/seat-start.module.code.ts"

const NOTICE = "The turn is at world-builder."

const SEAT = {
  name: "mari-world-builder-harem-hotel",
  agentId: "0199a1b2-c3d4-7e5f-8091-a2b3c4d5e6f7",
  account: "aawalton",
}

test("an interactive start reads the prompt it is handed", async () => {
  expect(await promptAsked({ startMode: SEAT_MODE_INTERACTIVE, seatPrompt: NOTICE })).toBe(NOTICE)
})

test("an interactive start launches its seat with the prompt as the first turn", () => {
  const launch = detachedLaunch({ startMode: SEAT_MODE_INTERACTIVE, prompt: NOTICE }, SEAT)
  expect(launch).toEqual({ ...SEAT, prompt: NOTICE, mode: SEAT_MODE_INTERACTIVE })
})

test("an interactive start handed no prompt launches its seat with none", () => {
  expect(detachedLaunch({ startMode: SEAT_MODE_INTERACTIVE }, SEAT).prompt).toBe("")
})
