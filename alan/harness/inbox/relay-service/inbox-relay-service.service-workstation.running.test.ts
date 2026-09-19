import { expect, mock, test } from "bun:test"
import { inboxesEmail } from "akasha/alan/harness/inbox/readouts/inboxes-email/inboxes-email.readout.ts"
import { inboxesTasks } from "akasha/alan/harness/inbox/readouts/inboxes-tasks/inboxes-tasks.readout.ts"
import type { Carry } from "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
import { readout } from "akasha/alan/harness/readout/readout.page-type.ts"
import { inboxesTemperTasks } from "akasha/temper/progress/inboxes-temper-tasks/inboxes-temper-tasks.readout.ts"

const INBOXES = [
  `${readout.slug}/${inboxesEmail.slug}`,
  `${readout.slug}/${inboxesTasks.slug}`,
  `${readout.slug}/${inboxesTemperTasks.slug}`,
]

const TO = "https://alanwalton.com"

const NAMED: string[] = []

const SITES = new Set<string>()

let rounds = 0

const carrying = await import(
  "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
)

mock.module(
  "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts",
  () => ({
    ...carrying,
    carryEachReading: (carries: readonly Carry[]) => {
      rounds += 1
      for (const one of carries) {
        NAMED.push(one.point)
        SITES.add(one.to)
      }
      return Promise.resolve(undefined)
    },
  })
)

const running = await import(
  "akasha/alan/harness/inbox/relay-service/inbox-relay-service.service-workstation.running.code.ts"
)

function ready(): undefined {
  NAMED.length = 0
  SITES.clear()
  rounds = 0
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run names the three inbox counts this service carries, in the order it names them", async () => {
  ready()
  await running.runService()
  expect(NAMED).toEqual(INBOXES)
})

test("every inbox count is named against the one site that shows the counts", async () => {
  ready()
  await running.runService()
  expect([...SITES]).toEqual([TO])
})

test("a run hands the whole list over once rather than opening a carry per count", async () => {
  ready()
  await running.runService()
  expect(rounds).toBe(1)
})
