import { expect, mock, test } from "bun:test"
import {
  FOLLOWING_ON,
  outcomeOf,
} from "akasha/infrastructure/service/workstation/modules/run-outcome/run-outcome.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const STARTED: (readonly unknown[])[] = []
let THROWS = false

const SETTLE_MS = 20

const keeping = await import(
  "akasha/agent/seat/observation/modules/conversation-keeping/conversation-keeping.module.code.ts"
)

mock.module(
  "akasha/agent/seat/observation/modules/conversation-keeping/conversation-keeping.module.code.ts",
  () => ({
    ...keeping,
    watchConversations: (...given: readonly unknown[]) => {
      STARTED.push(given)
      if (THROWS) throw new Error("no watch")
      return () => undefined
    },
  })
)

const running = await import(
  "akasha/agent/seat/service-workstations/keep-seat-conversations/keep-seat-conversations.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run starts the watch the keeping module holds over the checkout", () => {
  STARTED.length = 0
  THROWS = false
  void running.runService()
  expect(STARTED).toEqual([[akashaRoot()]])
})

test("a run that started the watch does not end, so systemd is left with a service running", async () => {
  STARTED.length = 0
  THROWS = false
  await expect(outcomeOf(running.runService(), SETTLE_MS)).resolves.toBe(FOLLOWING_ON)
})

test("a watch that cannot start ends the run, so systemd is left with a service that failed", async () => {
  STARTED.length = 0
  THROWS = true
  await expect(running.runService()).rejects.toThrow()
})
