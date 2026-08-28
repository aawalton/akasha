import { expect, test } from "bun:test"
import type { CheckFailure } from "../check-shape.ts"
import akashaWitnessNotAsserted from "./akasha-witness-not-asserted.check.code.attachment.ts"

const ROOT = "/akasha-witness-not-asserted-on-checks"

const DECLARES = "akasha/write-system/landing.module.code.ts"

const ELSEWHERE = "akasha/other/forge.module.code.ts"

if (akashaWitnessNotAsserted.needs !== "tree") throw new Error("this check is handed a tree")

const runs = akashaWitnessNotAsserted.run

type Files = Readonly<Record<string, Buffer | string>>

function verdict(files: Files): readonly CheckFailure[] {
  const paths = Object.keys(files).map((one) => `${ROOT}/${one}`)
  const tree = {
    root: ROOT,
    at: (path: string): Buffer | null => {
      const body = files[path.slice(ROOT.length + 1)]
      if (body === undefined) return null
      return typeof body === "string" ? Buffer.from(body) : body
    },
    paths: (): readonly string[] => paths,
    gone: (): readonly string[] => [],
    goneElsewhere: (): readonly string[] => [],
    repointedElsewhere: (): ReadonlyMap<string, string> => new Map(),
    dir: (): string => ROOT,
  }
  return runs({ root: ROOT, paths, tree, keep: (): string => ROOT }, { before: null })
}

const LANDING = [
  `declare const witnessed: unique symbol`,
  ``,
  `export type Landing = {`,
  `  readonly [witnessed]: true`,
  `  readonly path: string`,
  `}`,
  ``,
  `export function landing(path: string): Landing {`,
  `  return { path } as unknown as Landing`,
  `}`,
  ``,
].join("\n")

const BOTH = [
  `declare const witnessed: unique symbol`,
  ``,
  `export type Landing = { readonly [witnessed]: true; readonly path: string }`,
  ``,
  `export type Removal = { readonly [witnessed]: true; readonly gone: string }`,
  ``,
].join("\n")

test("a module outside the one declaring a witness fails when it asserts to it, and the reason names the line, the witness and the module that declares it", () => {
  const said = verdict({
    [DECLARES]: LANDING,
    [ELSEWHERE]: `export const forged = {} as unknown as Landing\n`,
  })
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(`${ROOT}/${ELSEWHERE}`)
  expect(said[0]?.reason).toBe(
    "line 1 asserts to `Landing`, which " +
      `${ROOT}/${DECLARES} declares as a witness — ` +
      "a witness is obtained from the module that declares it or not at all"
  )
})

test("an assertion written in angle brackets is refused as one written with as", () => {
  const said = verdict({
    [DECLARES]: LANDING,
    [ELSEWHERE]: `export const forged = <Landing>{}\n`,
  })
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("line 1 asserts to `Landing`")
})

test("the module declaring a witness may assert to it", () => {
  expect(verdict({ [DECLARES]: LANDING })).toEqual([])
})

test("each witness one module declares is covered", () => {
  const said = verdict({
    [DECLARES]: BOTH,
    [ELSEWHERE]: `export const one = {} as Landing\nexport const two = {} as Removal\n`,
  })
  expect(said).toHaveLength(2)
  expect(said[0]?.reason).toContain("line 1 asserts to `Landing`")
  expect(said[1]?.reason).toContain("line 2 asserts to `Removal`")
})

test("every assertion standing in one file is refused, and each reason names its own line", () => {
  const said = verdict({
    [DECLARES]: LANDING,
    [ELSEWHERE]: `export const one = {} as Landing\nexport const two = {} as Landing\n`,
  })
  expect(said).toHaveLength(2)
  expect(said[0]?.reason).toContain("line 1 asserts to")
  expect(said[1]?.reason).toContain("line 2 asserts to")
})

test("asserting to a type no module declares as a witness passes", () => {
  expect(
    verdict({ [DECLARES]: LANDING, [ELSEWHERE]: `export const held = {} as Refusal\n` })
  ).toEqual([])
})

test("a type keyed by an exported unique symbol is not a witness", () => {
  const open = LANDING.replace("declare const witnessed", "export declare const witnessed")
  expect(
    verdict({ [DECLARES]: open, [ELSEWHERE]: `export const forged = {} as Landing\n` })
  ).toEqual([])
})

test("a type carrying no key computed from the symbol is not a witness", () => {
  const plain = [
    `declare const witnessed: unique symbol`,
    ``,
    `export type Landing = { readonly path: string }`,
    ``,
  ].join("\n")
  expect(
    verdict({ [DECLARES]: plain, [ELSEWHERE]: `export const forged = {} as Landing\n` })
  ).toEqual([])
})

test("a satisfies expression is not an assertion", () => {
  const files = { [DECLARES]: LANDING, [ELSEWHERE]: `export const held = {} satisfies Landing\n` }
  expect(verdict(files)).toEqual([])
})

test("a file outside the akasha folder is not judged", () => {
  const files = {
    [DECLARES]: LANDING,
    "checks-system/forge.ts": `export const forged = {} as Landing\n`,
  }
  expect(verdict(files)).toEqual([])
})

test("a witness declared outside the akasha folder is not found", () => {
  const files = {
    "checks-system/landing.module.code.ts": LANDING,
    [ELSEWHERE]: `export const forged = {} as Landing\n`,
  }
  expect(verdict(files)).toEqual([])
})

test("a body that is not UTF-8 text is not judged", () => {
  const files = { [DECLARES]: LANDING, [ELSEWHERE]: Buffer.from([0xff, 0xfe, 0x00]) }
  expect(verdict(files)).toEqual([])
})

test("a tree carrying no witness type at all is not judged", () => {
  expect(verdict({ [ELSEWHERE]: `export const forged = {} as Landing\n` })).toEqual([])
})

test("a tree carrying no TypeScript is not judged", () => {
  expect(verdict({ "akasha/write-system/landing.md": LANDING })).toEqual([])
})
