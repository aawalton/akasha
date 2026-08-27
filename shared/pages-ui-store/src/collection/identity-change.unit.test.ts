import { describe, expect, test } from "bun:test"
import { applyIdentityChange, decideIdentityChange } from "./identity-change"

describe("decideIdentityChange", () => {
  test("first sign-in on an unowned store adopts, no wipe", () => {
    expect(decideIdentityChange(null, "user-a")).toEqual({ wipe: false, nextOwnerSub: "user-a" })
  })

  test("same sub is a strict no-op", () => {
    expect(decideIdentityChange("user-a", "user-a")).toEqual({
      wipe: false,
      nextOwnerSub: "user-a",
    })
  })

  test("a different non-null sub wipes and adopts the new owner", () => {
    expect(decideIdentityChange("user-a", "user-b")).toEqual({ wipe: true, nextOwnerSub: "user-b" })
  })

  test("sign-out (incoming null) does not wipe and keeps the owner sticky", () => {
    expect(decideIdentityChange("user-a", null)).toEqual({ wipe: false, nextOwnerSub: "user-a" })
  })

  test("anon on an unowned store is a no-op", () => {
    expect(decideIdentityChange(null, null)).toEqual({ wipe: false, nextOwnerSub: null })
  })
})

function fakeController(ready: boolean): {
  readonly controller: { readonly isReady: () => boolean; readonly resetAll: () => void }
  readonly calls: { resetAll: number }
} {
  const calls = { resetAll: 0 }
  return {
    calls,
    controller: {
      isReady: (): boolean => ready,
      resetAll: (): undefined => {
        calls.resetAll += 1
      },
    },
  }
}

function seededResume(): Map<string, { offset: string; handle: string }> {
  return new Map([["project", { offset: "10", handle: "h1" }]])
}

function seededDelivered(): Map<string, Set<string>> {
  return new Map([["project", new Set(["id-1", "id-2"])]])
}

describe("applyIdentityChange", () => {
  test("wipe decision truncates the collection and clears the resume + delivered maps", () => {
    const { controller, calls } = fakeController(true)
    const resume = seededResume()
    const delivered = seededDelivered()
    applyIdentityChange({ wipe: true, nextOwnerSub: "user-b" }, controller, resume, delivered)
    expect(calls.resetAll).toBe(1)
    expect(resume.size).toBe(0)
    expect(delivered.size).toBe(0)
  })

  test("no-wipe decision leaves the collection, resume, and delivered maps untouched", () => {
    const { controller, calls } = fakeController(true)
    const resume = seededResume()
    const delivered = seededDelivered()
    applyIdentityChange({ wipe: false, nextOwnerSub: "user-a" }, controller, resume, delivered)
    expect(calls.resetAll).toBe(0)
    expect(resume.size).toBe(1)
    expect(delivered.size).toBe(1)
  })

  test("wipe skips resetAll before sync starts but still clears resume + delivered", () => {
    const { controller, calls } = fakeController(false)
    const resume = seededResume()
    const delivered = seededDelivered()
    applyIdentityChange({ wipe: true, nextOwnerSub: "user-b" }, controller, resume, delivered)
    expect(calls.resetAll).toBe(0)
    expect(resume.size).toBe(0)
    expect(delivered.size).toBe(0)
  })
})
