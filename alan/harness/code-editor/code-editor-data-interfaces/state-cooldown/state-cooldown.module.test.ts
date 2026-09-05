import { describe, expect, it } from "bun:test"
import {
  decide,
  type Held,
  heldAfter,
  NOTHING_WRITTEN,
  released,
  releasedHeld,
} from "./state-cooldown.module.code.ts"

const COOLDOWN = 100

function afterWriting(line: string, at: number): Held {
  const decision = decide(NOTHING_WRITTEN, line, at, COOLDOWN)
  return heldAfter(NOTHING_WRITTEN, decision, line, at)
}

describe("the first change", () => {
  it("is written at once", () => {
    expect(decide(NOTHING_WRITTEN, "a", 0, COOLDOWN)).toEqual({ act: "write", line: "a" })
  })
})

describe("a change inside the cooldown", () => {
  it("waits out the rest of it", () => {
    const held = afterWriting("a", 1_000)
    expect(decide(held, "b", 1_050, COOLDOWN)).toEqual({ act: "hold", untilMs: 1_100 })
  })

  it("is written once the cooldown has run out", () => {
    const held = afterWriting("a", 1_000)
    expect(decide(held, "b", 1_100, COOLDOWN)).toEqual({ act: "write", line: "b" })
  })

  it("leaves only the last of several waiting", () => {
    let held = afterWriting("a", 1_000)
    for (const line of ["b", "c", "d"]) {
      const decision = decide(held, line, 1_050, COOLDOWN)
      expect(decision.act).toBe("hold")
      held = heldAfter(held, decision, line, 1_050)
    }
    expect(held.waiting).toBe("d")
    expect(released(held, 1_100)).toEqual({ act: "write", line: "d" })
  })
})

describe("a line that did not change", () => {
  it("is not written again", () => {
    const held = afterWriting("a", 1_000)
    expect(decide(held, "a", 5_000, COOLDOWN)).toEqual({ act: "rest" })
  })

  it("is not written when a cooldown ends on it", () => {
    let held = afterWriting("a", 1_000)
    held = { ...held, waiting: "a" }
    expect(released(held, 1_100)).toEqual({ act: "rest" })
  })
})

describe("a cooldown that ends with nothing waiting", () => {
  it("writes nothing", () => {
    const held = afterWriting("a", 1_000)
    expect(released(held, 1_100)).toEqual({ act: "rest" })
  })

  it("leaves the last write where it was", () => {
    const held = afterWriting("a", 1_000)
    const after = releasedHeld(held, released(held, 1_100), 1_100)
    expect(after.writtenAt).toBe(1_000)
    expect(after.written).toBe("a")
  })
})

describe("one file's cooldown", () => {
  it("is counted from that file's own last write", () => {
    const early = afterWriting("a", 1_000)
    const late = afterWriting("x", 1_400)
    expect(decide(early, "b", 1_450, COOLDOWN)).toEqual({ act: "write", line: "b" })
    expect(decide(late, "y", 1_450, COOLDOWN)).toEqual({ act: "hold", untilMs: 1_500 })
  })
})
