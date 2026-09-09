import { afterAll, describe, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { scratchWorld } from "../../../../modules/scratching/scratching.module.code.ts"
import {
  heldOnce,
  numberIn,
  pathUnder,
  routedIn,
  type Shape,
  textIn,
  wholeIn,
} from "./flag-arguing.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const SHAPES = new Map<string, Shape>([
  ["--prompt", "prose"],
  ["--seed", "token"],
  ["--lightning", "switch"],
])

describe("a value read out of a file", () => {
  test("the file's whole body is the value", () => {
    const root = scratch.rootFor("flag-arguing-")
    const path = join(root, "prompt.txt")
    writeFileSync(path, "a cat at a window")
    expect(textIn(path)).toEqual({ text: "a cat at a window" })
  })

  test("a path that would not read is answered as why rather than thrown", () => {
    const root = scratch.rootFor("flag-arguing-")
    const said = textIn(join(root, "nothing-was-written-here.txt"))
    expect("why" in said).toBe(true)
  })
})

describe("which flag a routed flag names", () => {
  test("a flag ending in `-file` names the flag it routes to", () => {
    expect(routedIn("--prompt-file", SHAPES)).toBe("--prompt")
  })

  test("a flag ending in `-file` whose flag carries no prose routes nowhere", () => {
    expect(routedIn("--seed-file", SHAPES)).toBe(null)
  })

  test("a flag ending in nothing routes nowhere", () => {
    expect(routedIn("--prompt", SHAPES)).toBe(null)
  })
})

describe("a whole number read off what was said", () => {
  test("digits alone are the number", () => {
    expect(wholeIn(" 81 ")).toBe(81)
  })

  test("anything but digits is no number", () => {
    expect(wholeIn("81.5")).toBe(null)
    expect(wholeIn("-4")).toBe(null)
    expect(wholeIn("")).toBe(null)
  })

  test("a number too big to be exact is no whole number", () => {
    expect(wholeIn("9".repeat(30))).toBe(null)
  })

  test("a flag nothing said carries no number", () => {
    expect(numberIn(new Map(), "--seed")).toBeUndefined()
  })

  test("a flag carrying what is no number carries no number", () => {
    expect(numberIn(new Map([["--seed", "later"]]), "--seed")).toBeUndefined()
  })

  test("a flag carrying digits carries that number", () => {
    expect(numberIn(new Map([["--seed", "7"]]), "--seed")).toBe(7)
  })
})

describe("a path said on the command line", () => {
  test("a path opening with `~/` is read against the home directory", () => {
    expect(pathUnder("/nowhere", "~/held.png")).toBe(join(homedir(), "held.png"))
  })

  test("an absolute path is taken as that path is", () => {
    expect(pathUnder("/nowhere", "/held/one.png")).toBe("/held/one.png")
  })

  test("any other path is read against the root handed over", () => {
    expect(pathUnder("/nowhere", "held/one.png")).toBe("/nowhere/held/one.png")
  })
})

describe("a flag held to one value", () => {
  test("the value said is what the flag carries", () => {
    const said = new Map<string, string>()
    const refusals: string[] = []
    heldOnce(said, refusals, "--seed", "7")
    expect(said.get("--seed")).toBe("7")
    expect(refusals).toEqual([])
  })

  test("a flag said twice is refused and keeps the value said first", () => {
    const said = new Map<string, string>()
    const refusals: string[] = []
    heldOnce(said, refusals, "--seed", "7")
    heldOnce(said, refusals, "--seed", "9")
    expect(said.get("--seed")).toBe("7")
    expect(refusals[0]).toContain("is said more than once")
  })
})
