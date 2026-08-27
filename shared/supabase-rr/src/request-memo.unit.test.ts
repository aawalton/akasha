import { describe, expect, test } from "bun:test"
import { createRequestMemo } from "./request-memo"

describe("createRequestMemo", () => {
  test("runs the factory at most once per request", () => {
    const memo = createRequestMemo<{ n: number }>()
    const request = new Request("https://example.test/")
    let calls = 0
    const factory = () => {
      calls += 1
      return { n: calls }
    }
    const a = memo.get(request, factory)
    const b = memo.get(request, factory)
    expect(calls).toBe(1)
    expect(b).toBe(a)
    expect(a.n).toBe(1)
  })

  test("three concurrent loaders share the one memoized value — no loser recomputes", () => {
    const memo = createRequestMemo<{ id: string }>()
    const request = new Request("https://example.test/story-chapter/apology-6fed9037")
    let calls = 0
    const factory = () => {
      calls += 1
      return { id: `v${calls}` }
    }
    const r1 = memo.get(request, factory)
    const r2 = memo.get(request, factory)
    const r3 = memo.get(request, factory)
    expect(calls).toBe(1)
    expect(r1).toBe(r2)
    expect(r2).toBe(r3)
    expect(r1.id).toBe("v1")
  })

  test("a different request gets its own factory run", () => {
    const memo = createRequestMemo<number>()
    let calls = 0
    const factory = () => {
      calls += 1
      return calls
    }
    const reqA = new Request("https://example.test/a")
    const reqB = new Request("https://example.test/b")
    expect(memo.get(reqA, factory)).toBe(1)
    expect(memo.get(reqA, factory)).toBe(1)
    expect(memo.get(reqB, factory)).toBe(2)
    expect(calls).toBe(2)
  })

  test("memoizes an in-flight promise so one refresh serves every awaiter", async () => {
    const memo = createRequestMemo<Promise<string>>()
    const request = new Request("https://example.test/p")
    let refreshes = 0
    const factory = () => {
      refreshes += 1
      return Promise.resolve(`user-${refreshes}`)
    }
    const p1 = memo.get(request, factory)
    const p2 = memo.get(request, factory)
    expect(p1).toBe(p2)
    expect(await p1).toBe("user-1")
    expect(await p2).toBe("user-1")
    expect(refreshes).toBe(1)
  })
})
