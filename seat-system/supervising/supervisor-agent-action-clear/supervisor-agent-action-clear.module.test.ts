import { expect, test } from "bun:test"
import {
  clearBeforeSigterm,
  consumeThenProxySwap,
} from "./supervisor-agent-action-clear.module.code.ts"

test("a clear that answers is awaited", async () => {
  const seen: string[] = []
  await clearBeforeSigterm(async (agentId) => {
    seen.push(agentId)
  }, "a")
  expect(seen).toEqual(["a"])
})

test("a clear that faults does not hold up the signal", async () => {
  await clearBeforeSigterm(async () => {
    throw new Error("refused")
  }, "a")
})

test("a clear that never answers stops holding up the signal", async () => {
  const started = Date.now()
  await clearBeforeSigterm(() => new Promise(() => {}), "a")
  expect(Date.now() - started).toBeLessThan(20_000)
}, 30_000)

test("a proxy swap happens only after the request asking for it is consumed", async () => {
  const order: string[] = []
  await consumeThenProxySwap({
    clear: async () => {
      order.push("clear")
    },
    swap: () => {
      order.push("swap")
    },
  })
  expect(order).toEqual(["clear", "swap"])
})

test("a swap is not made where the clear before it faults", async () => {
  let swapped = false
  await expect(
    consumeThenProxySwap({
      clear: async () => {
        throw new Error("refused")
      },
      swap: () => {
        swapped = true
      },
    })
  ).rejects.toThrow("refused")
  expect(swapped).toBe(false)
})
