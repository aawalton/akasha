import { expect, mock, test } from "bun:test"
import { checkoutAt } from "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"

const SETTLED = "settled"
const LISTENING_ON = "listening on"
const HANDED: string[] = []

const listening = await import("akasha/pages/service/page-listening/page-listening.module.code.ts")

mock.module("akasha/pages/service/page-listening/page-listening.module.code.ts", () => ({
  ...listening,
  runPageListening: (root: string) => {
    HANDED.push(root)
  },
}))

const running = await import(
  "akasha/pages/service/service-workstations/pages-service.service-workstation.running.code.ts"
)

function outcomeOf(run: Promise<never>, ms: number): Promise<string> {
  return Promise.race([
    run.then(() => SETTLED),
    new Promise<string>((say) => {
      setTimeout(() => say(LISTENING_ON), ms)
    }),
  ])
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run binds through the listening module rather than through servers bound again here", async () => {
  HANDED.length = 0
  await expect(outcomeOf(running.runService(), 25)).resolves.toBe(LISTENING_ON)
  expect(HANDED).toEqual([checkoutAt()])
})

test("a run does not answer while the servers are up, so the runner's process stays the service", async () => {
  HANDED.length = 0
  await expect(outcomeOf(running.runService(), 100)).resolves.toBe(LISTENING_ON)
})

test("a host name that would not bind is carried out rather than swallowed, so a failed start is a failed unit", async () => {
  mock.module("akasha/pages/service/page-listening/page-listening.module.code.ts", () => ({
    ...listening,
    runPageListening: () => {
      throw new Error("no host name the page states could be bound at 8787")
    },
  }))
  await expect(running.runService()).rejects.toThrow("no host name the page states could be bound")
})
