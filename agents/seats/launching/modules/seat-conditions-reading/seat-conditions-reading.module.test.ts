import { expect, test } from "bun:test"
import {
  type SeatConditions,
  seatConditionsPastRefresh,
} from "akasha/agents/seats/launching/modules/seat-conditions-reading/seat-conditions-reading.module.code.ts"

const MID_REFRESH =
  "which `page-type` carries `seat-conditions` as its `slug` could not be answered — " +
  "an index that is missing is not an index naming none"

const STATED: SeatConditions = {
  model: "opus",
  subagentModel: null,
  fallbackModel: null,
  autoCompactWindow: null,
  effortLevel: null,
  subagentSpawnDepth: null,
  toolTimeout: null,
  resumeThresholdMinutes: null,
  resumeTokenThreshold: null,
  extendedContextAvailable: false,
}

test("an index part way through a refresh is said once while the conditions are read again", async () => {
  const said: string[] = []
  let asked = 0
  const stated = await seatConditionsPastRefresh(
    () => {
      asked += 1
      if (asked < 4) throw new Error(MID_REFRESH)
      return STATED
    },
    {
      askingAgainMs: 1,
      say: (text) => {
        said.push(text)
      },
    }
  )

  expect(stated.model).toBe("opus")
  expect(asked).toBe(4)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("part way through a refresh")
})

test("a wait that runs past its ceiling refuses the read naming the refresh", async () => {
  const said: string[] = []
  let clock = 0
  const asked = seatConditionsPastRefresh(
    () => {
      clock += 60
      throw new Error(MID_REFRESH)
    },
    {
      askingAgainMs: 1,
      waitingAtMostMs: 100,
      now: () => clock,
      say: (text) => {
        said.push(text)
      },
    }
  )

  await expect(asked).rejects.toThrow("part way through a refresh")
  expect(said.some((one) => one.includes("went unread"))).toBe(true)
})

test("a throw that is no refresh reaches whoever asked without waiting", async () => {
  const said: string[] = []
  let asked = 0
  const reading = seatConditionsPastRefresh(
    () => {
      asked += 1
      throw new Error("the wire is broken")
    },
    {
      askingAgainMs: 1,
      say: (text) => {
        said.push(text)
      },
    }
  )

  await expect(reading).rejects.toThrow("the wire is broken")
  expect(asked).toBe(1)
  expect(said).toEqual([])
})
