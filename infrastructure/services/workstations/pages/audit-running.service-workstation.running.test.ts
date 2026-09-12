import { expect, mock, test } from "bun:test"

const RAN: string[] = []

const audit = await import("akasha/checks/modules/audit-serving/audit-serving.module.code.ts")

mock.module("akasha/checks/modules/audit-serving/audit-serving.module.code.ts", () => ({
  ...audit,
  runAuditServing: () => {
    RAN.push("round")
    return Promise.resolve()
  },
}))

const running = await import(
  "akasha/infrastructure/services/workstations/pages/audit-running.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the audit module's own round rather than a round written again here", async () => {
  RAN.length = 0
  await running.runService()
  expect(RAN).toEqual(["round"])
})

test("a run answers once the round is over, because this service runs hourly rather than until stopped", async () => {
  RAN.length = 0
  await expect(running.runService()).resolves.toBeUndefined()
})

test("a round that told thea nothing is carried out rather than swallowed, so a broken round is a failed unit", async () => {
  mock.module("akasha/checks/modules/audit-serving/audit-serving.module.code.ts", () => ({
    ...audit,
    runAuditServing: () => Promise.reject(new Error(audit.NOTHING_TOLD)),
  }))
  await expect(running.runService()).rejects.toThrow(audit.NOTHING_TOLD)
})
