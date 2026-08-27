import { describe, expect, test } from "bun:test"
import { waitForPort, waitForPortFree } from "./readiness"

describe("waitForPort", () => {
  test("resolves true once a real listener is up (no throw from Bun.connect)", async () => {
    const server = Bun.listen({
      hostname: "127.0.0.1",
      port: 0,
      socket: {
        data() {},
        open(s) {
          s.end()
        },
      },
    })
    try {
      const ready = await waitForPort("127.0.0.1", server.port, {
        timeoutMs: 2_000,
        intervalMs: 50,
      })
      expect(ready).toBe(true)
    } finally {
      server.stop(true)
    }
  })

  test("resolves false (never throws) when nothing is listening", async () => {
    const ready = await waitForPort("127.0.0.1", 1, { timeoutMs: 300, intervalMs: 50 })
    expect(ready).toBe(false)
  })
})

describe("waitForPortFree", () => {
  test("resolves true immediately when the port is already free", async () => {
    const freed = await waitForPortFree("127.0.0.1", 1, { timeoutMs: 2_000, intervalMs: 50 })
    expect(freed).toBe(true)
  })

  test("resolves false within the timeout while a listener is still up", async () => {
    const server = Bun.listen({
      hostname: "127.0.0.1",
      port: 0,
      socket: {
        data() {},
        open(s) {
          s.end()
        },
      },
    })
    try {
      const freed = await waitForPortFree("127.0.0.1", server.port, {
        timeoutMs: 300,
        intervalMs: 50,
      })
      expect(freed).toBe(false)
    } finally {
      server.stop(true)
    }
  })

  test("resolves true once a previously-bound listener stops", async () => {
    const server = Bun.listen({
      hostname: "127.0.0.1",
      port: 0,
      socket: {
        data() {},
        open(s) {
          s.end()
        },
      },
    })
    const { port } = server
    setTimeout(() => server.stop(true), 100)
    const freed = await waitForPortFree("127.0.0.1", port, { timeoutMs: 3_000, intervalMs: 50 })
    expect(freed).toBe(true)
  })
})
