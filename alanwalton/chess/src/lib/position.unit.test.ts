import { describe, expect, test } from "bun:test"
import { classifyStatus, strengthOptions } from "./position"

describe("classifyStatus", () => {
  test("no moves + in check = checkmate", () => {
    expect(classifyStatus(0, true)).toBe("checkmate")
  })
  test("no moves + not in check = stalemate", () => {
    expect(classifyStatus(0, false)).toBe("stalemate")
  })
  test("moves available + in check = check", () => {
    expect(classifyStatus(3, true)).toBe("check")
  })
  test("moves available + not in check = ongoing", () => {
    expect(classifyStatus(20, false)).toBe("ongoing")
  })
})

describe("strengthOptions", () => {
  test("defaults to full Skill Level when nothing specified", () => {
    const r = strengthOptions({})
    expect(r.mode).toBe("level")
    expect(r.value).toBe(20)
    expect(r.options).toEqual(["setoption name Skill Level value 20"])
  })
  test("builds Skill Level options", () => {
    const r = strengthOptions({ level: 3 })
    expect(r).toEqual({ options: ["setoption name Skill Level value 3"], mode: "level", value: 3 })
  })
  test("builds UCI_LimitStrength + Elo options", () => {
    const r = strengthOptions({ elo: 1500 })
    expect(r.mode).toBe("elo")
    expect(r.value).toBe(1500)
    expect(r.options).toEqual([
      "setoption name UCI_LimitStrength value true",
      "setoption name UCI_Elo value 1500",
    ])
  })
  test("rejects out-of-range Skill Level", () => {
    expect(() => strengthOptions({ level: 21 })).toThrow()
    expect(() => strengthOptions({ level: -1 })).toThrow()
  })
  test("rejects out-of-range Elo", () => {
    expect(() => strengthOptions({ elo: 1000 })).toThrow()
    expect(() => strengthOptions({ elo: 4000 })).toThrow()
  })
  test("rejects specifying both level and elo", () => {
    expect(() => strengthOptions({ level: 5, elo: 1500 })).toThrow()
  })
})
