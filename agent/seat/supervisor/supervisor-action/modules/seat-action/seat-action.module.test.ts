import { expect, test } from "bun:test"
import { TAKE_UP_MS } from "akasha/agent/seat/supervisor/supervisor-action/modules/seat-action/seat-action.module.code.ts"
import { HEARTBEAT_INTERVAL_MS } from "akasha/agent/seat/supervisor/supervisor-timer/modules/supervisor-heartbeat/supervisor-heartbeat.module.code.ts"

test("the wait for an action to be taken up outlasts a whole heartbeat", () => {
  expect(TAKE_UP_MS).toBeGreaterThan(HEARTBEAT_INTERVAL_MS)
})
