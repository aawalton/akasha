import { describe, expect, it } from "bun:test"

import {
  computeReachability,
  isFullyReached,
  isNameReached,
} from "../../src/transpilation/reachability"
import { getSf, makeProgram } from "./test-helpers"

describe("reachability — namespace imports — member access tracking", () => {
  it("static member access only — marks just the accessed name", () => {
    const program = makeProgram([
      {
        path: "/main.ts",
        contents: `import * as ns from "./mod"\nexport const r = ns.a + ns.a\n`,
      },
      {
        path: "/mod.ts",
        contents: `export const a = 1\nexport const b = 2\nexport const c = 3\n`,
      },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(result.reachableFiles.has(mod)).toBe(true)
    expect(isFullyReached(result, mod)).toBe(false)
    expect(isNameReached(result, mod, "a")).toBe(true)
    expect(isNameReached(result, mod, "b")).toBe(false)
    expect(isNameReached(result, mod, "c")).toBe(false)
  })

  it("multiple distinct accesses — marks each accessed name", () => {
    const program = makeProgram([
      {
        path: "/main.ts",
        contents: `import * as ns from "./mod"\nexport const r = ns.a + ns.b\n`,
      },
      {
        path: "/mod.ts",
        contents: `export const a = 1\nexport const b = 2\nexport const c = 3\n`,
      },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(result.reachableFiles.has(mod)).toBe(true)
    expect(isFullyReached(result, mod)).toBe(false)
    expect(isNameReached(result, mod, "a")).toBe(true)
    expect(isNameReached(result, mod, "b")).toBe(true)
    expect(isNameReached(result, mod, "c")).toBe(false)
  })

  it("string-literal computed access — marks the literal name", () => {
    const program = makeProgram([
      {
        path: "/main.ts",
        contents: `import * as ns from "./mod"\nexport const r = ns["a"]\n`,
      },
      {
        path: "/mod.ts",
        contents: `export const a = 1\nexport const b = 2\nexport const c = 3\n`,
      },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(result.reachableFiles.has(mod)).toBe(true)
    expect(isFullyReached(result, mod)).toBe(false)
    expect(isNameReached(result, mod, "a")).toBe(true)
    expect(isNameReached(result, mod, "b")).toBe(false)
    expect(isNameReached(result, mod, "c")).toBe(false)
  })

  it("non-literal computed access — escapes to fully reached", () => {
    const program = makeProgram([
      {
        path: "/main.ts",
        contents: `import * as ns from "./mod"\nconst k = "a"\nexport const r = ns[k]\n`,
      },
      {
        path: "/mod.ts",
        contents: `export const a = 1\nexport const b = 2\nexport const c = 3\n`,
      },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(isFullyReached(result, mod)).toBe(true)
  })

  it("type-only reference (`ns.T` in a type position) — marks no names", () => {
    const program = makeProgram([
      {
        path: "/main.ts",
        contents: `import * as ns from "./mod"\nexport const r: ns.T = "x"\n`,
      },
      {
        path: "/mod.ts",
        contents: `export type T = string\nexport const a = 1\nexport const b = 2\n`,
      },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(result.reachableFiles.has(mod)).toBe(true)
    expect(isFullyReached(result, mod)).toBe(false)
    expect(isNameReached(result, mod, "a")).toBe(false)
    expect(isNameReached(result, mod, "b")).toBe(false)
  })

  it("`typeof ns` in type position — marks no names", () => {
    const program = makeProgram([
      {
        path: "/main.ts",
        contents: `import * as ns from "./mod"\nexport type R = typeof ns\n`,
      },
      {
        path: "/mod.ts",
        contents: `export const a = 1\nexport const b = 2\nexport const c = 3\n`,
      },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(result.reachableFiles.has(mod)).toBe(true)
    expect(isFullyReached(result, mod)).toBe(false)
    expect(isNameReached(result, mod, "a")).toBe(false)
    expect(isNameReached(result, mod, "b")).toBe(false)
    expect(isNameReached(result, mod, "c")).toBe(false)
  })

  it("escape via call (`f(ns)`) — fully reached", () => {
    const program = makeProgram([
      {
        path: "/main.ts",
        contents:
          `import * as ns from "./mod"\n` +
          `declare function f(x: unknown): void\n` +
          `f(ns)\n` +
          `export const r = 1\n`,
      },
      {
        path: "/mod.ts",
        contents: `export const a = 1\nexport const b = 2\nexport const c = 3\n`,
      },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(isFullyReached(result, mod)).toBe(true)
  })

  it("escape via re-assignment (`const x = ns`) — fully reached", () => {
    const program = makeProgram([
      {
        path: "/main.ts",
        contents: `import * as ns from "./mod"\nconst x = ns\nexport const r = x.a\n`,
      },
      {
        path: "/mod.ts",
        contents: `export const a = 1\nexport const b = 2\nexport const c = 3\n`,
      },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(isFullyReached(result, mod)).toBe(true)
  })

  it("escape via `export { ns }` — fully reached", () => {
    const program = makeProgram([
      {
        path: "/main.ts",
        contents: `import * as ns from "./mod"\nexport { ns }\n`,
      },
      {
        path: "/mod.ts",
        contents: `export const a = 1\nexport const b = 2\nexport const c = 3\n`,
      },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(isFullyReached(result, mod)).toBe(true)
  })

  it("escape via `export default ns` — fully reached", () => {
    const program = makeProgram([
      {
        path: "/main.ts",
        contents: `import * as ns from "./mod"\nexport default ns\n`,
      },
      {
        path: "/mod.ts",
        contents: `export const a = 1\nexport const b = 2\nexport const c = 3\n`,
      },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(isFullyReached(result, mod)).toBe(true)
  })

  it("destructuring (named only) — marks each destructured name", () => {
    const program = makeProgram([
      {
        path: "/main.ts",
        contents: `import * as ns from "./mod"\nconst { a, b } = ns\nexport const r = a + b\n`,
      },
      {
        path: "/mod.ts",
        contents: `export const a = 1\nexport const b = 2\nexport const c = 3\n`,
      },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(result.reachableFiles.has(mod)).toBe(true)
    expect(isFullyReached(result, mod)).toBe(false)
    expect(isNameReached(result, mod, "a")).toBe(true)
    expect(isNameReached(result, mod, "b")).toBe(true)
    expect(isNameReached(result, mod, "c")).toBe(false)
  })

  it("destructuring with rest — escapes to fully reached", () => {
    const program = makeProgram([
      {
        path: "/main.ts",
        contents:
          `import * as ns from "./mod"\n` +
          `const { a, ...rest } = ns\n` +
          `export const r = a\n` +
          `export const s = rest\n`,
      },
      {
        path: "/mod.ts",
        contents: `export const a = 1\nexport const b = 2\nexport const c = 3\n`,
      },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(isFullyReached(result, mod)).toBe(true)
  })

  it("mixed access + escape — any escape escalates to fully reached", () => {
    const program = makeProgram([
      {
        path: "/main.ts",
        contents:
          `import * as ns from "./mod"\n` +
          `declare function f(x: unknown): void\n` +
          `const _r = ns.a\n` +
          `f(ns)\n` +
          `export const r = _r\n`,
      },
      {
        path: "/mod.ts",
        contents: `export const a = 1\nexport const b = 2\nexport const c = 3\n`,
      },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(isFullyReached(result, mod)).toBe(true)
  })

  it("zero references (declaration only) — file reachable, no names marked", () => {
    const program = makeProgram([
      {
        path: "/main.ts",
        contents: `import * as _ns from "./mod"\nexport const r = 1\n`,
      },
      {
        path: "/mod.ts",
        contents: `export const a = 1\nexport const b = 2\nexport const c = 3\n`,
      },
    ])
    const result = computeReachability(program, getSf(program, "/main.ts"))
    const mod = getSf(program, "/mod.ts")

    expect(result.reachableFiles.has(mod)).toBe(true)
    expect(isFullyReached(result, mod)).toBe(false)
    expect(isNameReached(result, mod, "a")).toBe(false)
    expect(isNameReached(result, mod, "b")).toBe(false)
    expect(isNameReached(result, mod, "c")).toBe(false)
  })
})
