import { expect, test } from "bun:test"
import type { AgentActionEvent } from "akasha/agent/seat/supervisor/supervisor-action/modules/supervisor-agent-action-types/supervisor-agent-action-types.module.code.ts"
import {
  ACTIONS,
  startRegretWatch,
} from "akasha/agent/seat/supervisor/supervisor-action/modules/supervisor-poll-agent-action/supervisor-poll-agent-action.module.code.ts"
import { supervisorAction } from "akasha/agent/seat/supervisor/supervisor-action/supervisor-action.page-type.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

test("the actions a seat can be asked to take are every supervisor-action page", () => {
  const root = rootFor(resolveRoots(), AKASHA)
  const pages: string[] = valuesOfType(root, supervisorAction.slug).flatMap((one) => {
    const named = partedIn(one.path)
    return named === null ? [] : [named.slug]
  })

  const actions: string[] = [...ACTIONS]

  expect(actions.sort()).toEqual(pages.sort())
})

const settle = (ms: number) => new Promise((done) => setTimeout(done, ms))

test("a regret asked of a seat reaches its supervisor within a tick rather than a heartbeat", async () => {
  const asked: AgentActionEvent = { action: "regret", messageId: "message-0123456789ab", cut: null }
  const delivered: AgentActionEvent[] = []
  const watch = startRegretWatch({
    getAgentId: () => "agent",
    deliver: (event) => {
      delivered.push(event)
    },
    tickMs: 5,
    read: async () => asked,
  })
  await settle(40)
  watch.stop()
  expect(delivered.length).toBeGreaterThan(0)
  expect(delivered[0]).toEqual(asked)
})

test("the regret watch leaves every other action to the heartbeat", async () => {
  const delivered: AgentActionEvent[] = []
  const watch = startRegretWatch({
    getAgentId: () => "agent",
    deliver: (event) => {
      delivered.push(event)
    },
    tickMs: 5,
    read: async () => ({ action: "restart-now", interruptMessage: null }),
  })
  await settle(40)
  watch.stop()
  expect(delivered).toEqual([])
})

test("a stopped regret watch reads nothing more", async () => {
  let reads = 0
  const watch = startRegretWatch({
    getAgentId: () => "agent",
    deliver: () => undefined,
    tickMs: 5,
    read: async () => {
      reads += 1
      return null
    },
  })
  await settle(30)
  watch.stop()
  const stoppedAt = reads
  await settle(30)
  expect(reads).toBe(stoppedAt)
})
