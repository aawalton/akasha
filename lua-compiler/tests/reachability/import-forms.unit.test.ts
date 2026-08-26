import { describe, expect, it } from "bun:test"

import {
  computeReachability,
  isFullyReached,
  isNameReached,
} from "../../src/transpilation/reachability"
import { getSf, makeProgram } from "./test-helpers"

describe("reachability — named imports", () => {
  it("marks named-imported targets reached with their names", () => {
    const program = makeProgram([
      { path: "/main.ts", contents: `import { a, b } from "./mod"\nexport const r = a + b\n` },
      { path: "/mod.ts", contents: `export const a = 1\nexport const b = 2\nexport const c = 3\n` },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(result.reachableFiles.has(mod)).toBe(true)
    expect(isNameReached(result, mod, "a")).toBe(true)
    expect(isNameReached(result, mod, "b")).toBe(true)
    expect(isNameReached(result, mod, "c")).toBe(false)
  })

  it("renames via `import { a as x }` mark the source name on target", () => {
    const program = makeProgram([
      { path: "/main.ts", contents: `import { a as x } from "./mod"\nexport const r = x\n` },
      { path: "/mod.ts", contents: `export const a = 1\nexport const b = 2\n` },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(isNameReached(result, mod, "a")).toBe(true)
    expect(isNameReached(result, mod, "b")).toBe(false)
  })
})

describe("reachability — default imports", () => {
  it("marks `default` reached on the target", () => {
    const program = makeProgram([
      { path: "/main.ts", contents: `import x from "./mod"\nexport const r = x\n` },
      { path: "/mod.ts", contents: `const a = 1\nexport default a\n` },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(isNameReached(result, mod, "default")).toBe(true)
  })
})

describe("reachability — side-effect imports", () => {
  it("marks the file reached without marking any names", () => {
    const program = makeProgram([
      { path: "/main.ts", contents: `import "./side"\nexport const r = 1\n` },
      { path: "/side.ts", contents: `export const _ran = (() => true)()\n` },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const side = getSf(program, "/side.ts")

    expect(result.reachableFiles.has(side)).toBe(true)
    expect(isNameReached(result, side, "_ran")).toBe(false)
    expect(isFullyReached(result, side)).toBe(false)
  })
})

describe("reachability — type-only imports", () => {
  it("does not mark the target reached for `import type { … }`", () => {
    const program = makeProgram([
      {
        path: "/main.ts",
        contents: `import type { T } from "./types"\nexport const r: T = "hi"\n`,
      },
      { path: "/types.ts", contents: `export type T = string\n` },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const types = getSf(program, "/types.ts")

    expect(result.reachableFiles.has(types)).toBe(false)
  })
})
