import { describe, expect, it } from "bun:test"
import { idAt } from "./id.ts"

describe("idAt — a page identity that does not come from where the page sits", () => {
  it("carries the moment in its first six bytes, so ids sort by when they were minted", () => {
    expect(idAt(1, () => 0)).toBe("00000000-0001-7000-8000-000000000000")
  })

  it("states version 7 and the RFC-4122 variant whatever the randomness gives", () => {
    expect(idAt(1, () => 0.9999999)).toBe("00000000-0001-7fff-bfff-ffffffffffff")
  })

  it("orders by the moment, which is the whole reason for version 7", () => {
    expect(idAt(1000, () => 0) < idAt(2000, () => 0)).toBe(true)
  })

  it("gives a different id for one moment, so two pages minted together are not one page", () => {
    let held = 0
    const counting = (): number => {
      held += 0.05
      return held % 1
    }
    expect(idAt(5, counting)).not.toBe(idAt(5, counting))
  })

  it("does not depend on a path, so a page keeps its identity when it moves", () => {
    expect(idAt(1, () => 0)).toBe(idAt(1, () => 0))
  })
})
