import { expect, mock, test } from "bun:test"
import type { Carry } from "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"

const UNREVIEWED = "readout/monarch-unreviewed-transactions"

const ALANS_SITE = "https://alanwalton.com"

const JENNYS_SITE = "https://smilingjenny.me"

const ROUNDS: (readonly Carry[])[] = []

const carrying = await import(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts"
)

mock.module(
  "akasha/alan/harness/readouts/relay-carrying/readout-relay-carrying.module.code.ts",
  () => ({
    ...carrying,
    carryEachReading: (carries: readonly Carry[]) => {
      ROUNDS.push(carries)
      return Promise.resolve(undefined)
    },
  })
)

const running = await import(
  "akasha/alan/harness/monarch/relay-service/monarch-relay-service.service-workstation.running.code.ts"
)

const roundsOfOneRun = async (): Promise<(readonly Carry[])[]> => {
  ROUNDS.length = 0
  await running.runService()
  return ROUNDS
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run names the unreviewed count against both sites that show it", async () => {
  const rounds = await roundsOfOneRun()
  expect(rounds[0]).toEqual([
    { point: UNREVIEWED, to: ALANS_SITE },
    { point: UNREVIEWED, to: JENNYS_SITE },
  ])
})

test("one list covers both sites, so the shared carrying is reached a single time", async () => {
  const rounds = await roundsOfOneRun()
  expect(rounds.length).toBe(1)
})
