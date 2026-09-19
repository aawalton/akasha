import { expect, mock, test } from "bun:test"

const HANDED: (readonly unknown[])[] = []

const AT =
  "akasha/alan/harness/email-routing/modules/persona-routing-run/persona-routing-run.module.code.ts"

const routing = await import(AT)

mock.module(AT, () => ({
  ...routing,
  runPersonaRouting: (...given: readonly unknown[]) => {
    HANDED.push(given)
    return Promise.resolve(undefined)
  },
}))

const service = await import(
  "akasha/alan/harness/email-routing/service-workstations/persona-email-routing/persona-email-routing.service-workstation.running.code.ts"
)

test("the run can be called with nothing, which is how the unit's command line calls it", () => {
  expect(typeof service.runService).toBe("function")
  expect(service.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(service)).toEqual(["runService"])
})

test("a service run turns the routing run with nothing said about how to run it", async () => {
  HANDED.length = 0
  await service.runService()
  expect(HANDED).toEqual([[]])
})

test("a run turns the routing module's own run rather than one written again here", async () => {
  HANDED.length = 0
  await service.runService()
  expect(HANDED.length).toBe(1)
})

test("a run that could not route is carried out rather than swallowed, so the unit fails", async () => {
  mock.module(AT, () => ({
    ...routing,
    runPersonaRouting: () => {
      throw new Error("the token cannot write routing rules")
    },
  }))
  await expect(service.runService()).rejects.toThrow("the token cannot write routing rules")
})
