import { expect, mock, test } from "bun:test"
import { checkoutAt } from "akasha/infrastructure/service/workstation/modules/service-checkout/service-checkout.module.code.ts"

const RAN: string[] = []

const BOUND: string[] = []

const round = await import("akasha/check/modules/audit-round/audit-round.module.code.ts")

mock.module("akasha/check/modules/audit-round/audit-round.module.code.ts", () => ({
  ...round,
  roundTold: (root: string) => {
    RAN.push(root)
    return Promise.resolve({ ran: [], turned: [], refused: [] })
  },
}))

const listening = await import(
  "akasha/check/modules/audit-listening/audit-listening.module.code.ts"
)

const tick = await import(
  "akasha/infrastructure/service/workstation/modules/tick-sleeping/tick-sleeping.module.code.ts"
)

const SETTLED = "settled"

const WAITING = "waiting out the hour to the round after"

mock.module(
  "akasha/infrastructure/service/workstation/modules/tick-sleeping/tick-sleeping.module.code.ts",
  () => ({
    ...tick,
    sleptUntilStopped: () => new Promise<boolean>(() => {}),
  })
)

function outcomeOf(run: Promise<never>, ms: number): Promise<string> {
  return Promise.race([
    run.then(() => SETTLED),
    new Promise<string>((say) => {
      setTimeout(() => say(WAITING), ms)
    }),
  ])
}

mock.module("akasha/check/modules/audit-listening/audit-listening.module.code.ts", () => ({
  ...listening,
  runAuditListening: (root: string) => {
    BOUND.push(root)
  },
}))

const running = await import(
  "akasha/check/service-workstations/audit-running/audit-running.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run binds through the listening module rather than through servers bound again here", async () => {
  BOUND.length = 0
  await expect(outcomeOf(running.runService(), 50)).resolves.toBe(WAITING)
  expect(BOUND).toEqual([checkoutAt()])
})

test("a round opens as the service starts, over the checkout the service reads", async () => {
  RAN.length = 0
  await expect(outcomeOf(running.runService(), 50)).resolves.toBe(WAITING)
  expect(RAN).toEqual([checkoutAt()])
})

const THREW = "the tree the audit would run over could not be read"

test("a round that threw leaves the service listening rather than ending the run", async () => {
  mock.module("akasha/check/modules/audit-round/audit-round.module.code.ts", () => ({
    ...round,
    roundTold: () => Promise.reject(new Error(THREW)),
  }))
  await expect(outcomeOf(running.runService(), 50)).resolves.toBe(WAITING)
})

test("a host name that would not bind is carried out rather than swallowed, so a failed start is a failed unit", async () => {
  mock.module("akasha/check/modules/audit-listening/audit-listening.module.code.ts", () => ({
    ...listening,
    runAuditListening: () => {
      throw new Error("no host name the page states could be bound at 8788")
    },
  }))
  await expect(running.runService()).rejects.toThrow("no host name the page states could be bound")
})
