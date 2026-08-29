import { expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import type { Leaving } from "../../../write-system/landing.module.code.ts"
import { wholeOf } from "../../checking.module.code.ts"
import { witnessNotAsserted, witnessTypesIn } from "./witness-not-asserted.check.code.ts"

const DECLARES = [
  "declare const witnessed: unique symbol",
  "export type Landing = { readonly [witnessed]: true; readonly path: string }",
  "export function landingOf(path: string): Landing {",
  "  return { path } as unknown as Landing",
  "}",
].join("\n")

let count = 0

function stage(files: Readonly<Record<string, string>>): string {
  count += 1
  const root = mkdtempSync(`${tmpdir()}/akasha-witness-${count}-`)
  for (const [at, body] of Object.entries(files)) writeFileSync(`${root}/${at}`, body)
  return root
}

function overAll(root: string): Leaving {
  return {
    root,
    changed: [],
    at: (path) => {
      try {
        return require("node:fs").readFileSync(path) as Uint8Array
      } catch {
        return null
      }
    },
  }
}

test("a witness type is found by the unexported unique symbol its module declares", () => {
  expect(witnessTypesIn("landing.ts", DECLARES)).toEqual(["Landing"])
})

test("a module exporting its symbol declares no witness, so nothing is bound by it", () => {
  const said = witnessTypesIn("open.ts", DECLARES.replace("declare const", "export declare const"))
  expect(said).toEqual([])
})

test("a file asserting to another module's witness is refused, and the line is named", () => {
  const root = stage({
    "landing.ts": DECLARES,
    "sneak.ts": [
      'import type { Landing } from "./landing.ts"',
      "export const held = { path: \"x\" } as Landing",
    ].join("\n"),
  })
  const said = witnessNotAsserted(wholeOf(overAll(root)))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(`${root}/sneak.ts`)
  expect(said[0]?.reason).toContain("line 2 asserts to `Landing`")
  expect(said[0]?.reason).toContain("landing.ts declares as a witness")
  rmSync(root, { recursive: true })
})

test("the module that declares a witness may still obtain one, so its own assertion is allowed", () => {
  const root = stage({ "landing.ts": DECLARES })
  expect(witnessNotAsserted(wholeOf(overAll(root)))).toEqual([])
  rmSync(root, { recursive: true })
})

test("a tree declaring no witness is judged clean without reading for assertions", () => {
  const root = stage({ "plain.ts": "export const one = 1\n" })
  expect(witnessNotAsserted(wholeOf(overAll(root)))).toEqual([])
  rmSync(root, { recursive: true })
})

test("the assertion is judged as the change would leave it, not as it is on disk", () => {
  const root = stage({ "landing.ts": DECLARES, "sneak.ts": "export const one = 1\n" })
  const now = ['import type { Landing } from "./landing.ts"', 'export const held = {} as Landing'].join("\n")
  const said = witnessNotAsserted(
    wholeOf({
      root,
      changed: [`${root}/sneak.ts`],
      at: (path) =>
        path === `${root}/sneak.ts`
          ? Buffer.from(now, "utf8")
          : (require("node:fs").readFileSync(path) as Uint8Array),
    })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(`${root}/sneak.ts`)
  rmSync(root, { recursive: true })
})

test("a file that is not text is passed over rather than refused", () => {
  const root = stage({ "landing.ts": DECLARES })
  writeFileSync(`${root}/raw.ts`, Buffer.from([0xff, 0xfe, 0x00, 0x01]))
  expect(witnessNotAsserted(wholeOf(overAll(root)))).toEqual([])
  rmSync(root, { recursive: true })
})
