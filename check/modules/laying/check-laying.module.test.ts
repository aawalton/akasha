import { afterAll, expect, test } from "bun:test"
import { existsSync, lstatSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import { altersChecks, laidOut } from "akasha/check/modules/laying/check-laying.module.code.ts"
import { arriving } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE = "held/one.check-code.ts"

const CODE = "held/one.check-code.check.code.ts"

const HELPER = "held/helper.ts"

const DEEPER = "held/deeper.ts"

const ELSEWHERE = "else/where.txt"

function rooted(): string {
  const root = scratch.rootFor("akasha-check-laying-")
  mkdirSync(join(root, "held"))
  mkdirSync(join(root, "else"))
  writeFileSync(join(root, PAGE), `export const one = { slug: "one" }\n`)
  writeFileSync(join(root, CODE), `import { SAID } from "./helper.ts"\nexport const said = SAID\n`)
  writeFileSync(join(root, HELPER), `export const SAID = "before"\n`)
  writeFileSync(join(root, ELSEWHERE), "elsewhere")
  return root
}

test("a change touching a check file or a file a check imports alters the checks, and one touching neither does not", () => {
  const root = rooted()
  expect(altersChecks(arriving(root, { [CODE]: "" }), [PAGE])).toBe(true)
  expect(altersChecks(arriving(root, { [HELPER]: "" }), [PAGE])).toBe(true)
  expect(altersChecks(arriving(root, { [ELSEWHERE]: "" }), [PAGE])).toBe(false)
})

test("a file a check reaches only through another file alters the checks", () => {
  const root = rooted()
  writeFileSync(join(root, HELPER), `export { SAID } from "./deeper.ts"\n`)
  writeFileSync(join(root, DEEPER), `export const SAID = "before"\n`)
  expect(altersChecks(arriving(root, { [DEEPER]: "" }), [PAGE])).toBe(true)
})

test("a file a check reaches only through imports naming types does not alter the checks", () => {
  const root = rooted()
  writeFileSync(
    join(root, CODE),
    `import type { Said } from "./helper.ts"\nexport type { Deeper } from "./deeper.ts"\nexport const said: Said = "one"\n`
  )
  writeFileSync(join(root, DEEPER), `export type Deeper = string\n`)
  expect(altersChecks(arriving(root, { [HELPER]: "" }), [PAGE])).toBe(false)
  expect(altersChecks(arriving(root, { [DEEPER]: "" }), [PAGE])).toBe(false)
})

test("a change taking away a file a check imports alters the checks", () => {
  const root = rooted()
  const left = arriving(root, {})
  const taken = {
    ...left,
    changed: [HELPER],
    after: (path: string) => (path === HELPER ? null : left.after(path)),
  }
  expect(altersChecks(taken, [PAGE])).toBe(true)
})

test("a check reaching what the change moved is laid out as the change leaves it", () => {
  const root = rooted()
  const laid = laidOut(
    arriving(root, { [PAGE]: "// moved\n", [HELPER]: 'export const SAID = "after"\n' }),
    [PAGE]
  )
  try {
    expect(lstatSync(join(laid.from, CODE)).isSymbolicLink()).toBe(false)
    expect(lstatSync(join(laid.from, dirname(ELSEWHERE))).isSymbolicLink()).toBe(true)
    const loaded = createRequire(import.meta.url)(join(laid.from, CODE)) as { said: string }
    expect(loaded.said).toBe("after")
  } finally {
    laid.swept()
  }
  expect(existsSync(laid.from)).toBe(false)
  expect(readFileSync(join(root, HELPER), "utf8")).toBe(`export const SAID = "before"\n`)
})
