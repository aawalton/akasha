import { describe, expect, test } from "bun:test"
import type { PoolService } from "./config"
import { createMutex } from "./mutex"
import { makePoolHandler } from "./server"
import { createSwapController, type SwapEffects } from "./swap"

const makeEffects = (): {
  readonly effects: SwapEffects
  readonly startCalls: readonly string[]
} => {
  let portState: "up" | "down" = "down"
  const startCalls: string[] = []
  const effects: SwapEffects = {
    startService: async (_uid, label) => {
      startCalls.push(label)
      portState = "up"
    },
    stopService: async () => {
      portState = "down"
    },
    killService: async () => {
      portState = "down"
    },
    waitForPort: async () => portState === "up",
    waitForPortFree: async () => portState === "down",
  }
  return { effects, startCalls }
}

const GEN: PoolService = {
  name: "image-gen",
  publicPort: 8086,
  publicHost: "0.0.0.0",
  internalPort: 18086,
  launchdLabel: "com.alanwalton.inference.image-gen",
}
const config = { adminPort: 8099, warmSet: [], services: [GEN] }
const delay = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))
const req = (): Request => new Request("http://100.64.0.2:8086/v1/images/generations")

describe("makePoolHandler request serialization", () => {
  test("N concurrent requests each get an output, run one-at-a-time (none dropped)", async () => {
    const { effects, startCalls } = makeEffects()
    const swap = createSwapController(config, createMutex(), effects)
    let inFlight = 0
    let maxInFlight = 0
    let proxied = 0
    const proxy = async (_s: PoolService, _r: Request): Promise<Response> => {
      inFlight += 1
      maxInFlight = Math.max(maxInFlight, inFlight)
      await delay(5)
      inFlight -= 1
      proxied += 1
      return new Response("png", { status: 200 })
    }
    const handler = makePoolHandler(GEN, swap, proxy)

    const responses = await Promise.all([
      handler(req()),
      handler(req()),
      handler(req()),
      handler(req()),
    ])

    expect(responses.map((r) => r.status)).toEqual([200, 200, 200, 200])
    expect(proxied).toBe(4)
    expect(maxInFlight).toBe(1)
    expect(startCalls).toEqual([GEN.launchdLabel])
  })

  test("a request tagged x-cop-priority:high drains ahead of an earlier-queued normal one", async () => {
    const { effects } = makeEffects()
    const swap = createSwapController(config, createMutex(), effects)
    const order: string[] = []
    const proxy = async (_s: PoolService, r: Request): Promise<Response> => {
      const tag = r.headers.get("x-tag") ?? "?"
      order.push(`${tag}:start`)
      await delay(5)
      order.push(`${tag}:end`)
      return new Response("ok", { status: 200 })
    }
    const handler = makePoolHandler(GEN, swap, proxy)
    const tagged = (tag: string, priority?: string): Request =>
      new Request("http://100.64.0.2:8086/v1/images/generations", {
        headers: {
          "x-tag": tag,
          ...(priority === undefined ? {} : { "x-cop-priority": priority }),
        },
      })

    const a = handler(tagged("A"))
    const b = handler(tagged("B"))
    const c = handler(tagged("C", "high"))

    await Promise.all([a, b, c])
    expect(order).toEqual(["A:start", "A:end", "C:start", "C:end", "B:start", "B:end"])
  })

  test("a swap that never becomes ready yields a 504 and never proxies", async () => {
    const { effects } = makeEffects()
    const stuck: SwapEffects = { ...effects, waitForPort: async () => false }
    const swap = createSwapController(config, createMutex(), stuck)
    let proxied = false
    const proxy = async (): Promise<Response> => {
      proxied = true
      return new Response("png", { status: 200 })
    }
    const handler = makePoolHandler(GEN, swap, proxy)

    const res = await handler(req())

    expect(res.status).toBe(504)
    expect(proxied).toBe(false)
    expect(await res.text()).toContain("did not become ready")
  })
})
