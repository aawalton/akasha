import { describe, expect, it } from "bun:test"

import {
  computeReachability,
  isFullyReached,
  isNameReached,
} from "../../src/transpilation/reachability"
import { getSf, makeProgram } from "./test-helpers"

describe("reachability — re-export propagation", () => {
  it("propagates names through `export * from` chains, dropping unreached branches", () => {
    const program = makeProgram([
      { path: "/main.ts", contents: `import { a } from "./barrel"\nexport const r = a\n` },
      { path: "/barrel.ts", contents: `export * from "./mod-a"\nexport * from "./mod-b"\n` },
      { path: "/mod-a.ts", contents: `export const a = 1\n` },
      { path: "/mod-b.ts", contents: `export const b = 2\n` },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const modA = getSf(program, "/mod-a.ts")
    const modB = getSf(program, "/mod-b.ts")

    expect(result.reachableFiles.has(modA)).toBe(true)
    expect(result.reachableFiles.has(modB)).toBe(false)
    expect(isNameReached(result, modA, "a")).toBe(true)
    expect(isNameReached(result, modB, "b")).toBe(false)
  })

  it("propagates renamed selective `export { a as b } from`", () => {
    const program = makeProgram([
      { path: "/main.ts", contents: `import { y } from "./barrel"\nexport const r = y\n` },
      { path: "/barrel.ts", contents: `export { x as y } from "./mod"\n` },
      { path: "/mod.ts", contents: `export const x = 1\n` },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(result.reachableFiles.has(mod)).toBe(true)
    expect(isNameReached(result, mod, "x")).toBe(true)
    expect(isNameReached(result, mod, "y")).toBe(false)
  })

  it("treats `export * as ns from` as conservative when `ns` is reached", () => {
    const program = makeProgram([
      { path: "/main.ts", contents: `import { ns } from "./barrel"\nexport const r = ns.a\n` },
      { path: "/barrel.ts", contents: `export * as ns from "./mod"\n` },
      { path: "/mod.ts", contents: `export const a = 1\nexport const b = 2\n` },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(isFullyReached(result, mod)).toBe(true)
  })
})
