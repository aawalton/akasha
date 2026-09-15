import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Judging } from "akasha/check/modules/judging/judging.module.code.ts"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import { module as modulePage } from "akasha/code/module/module.page-type.ts"
import type { Landed, Refused } from "akasha/command/modules/landing/landing.module.code.ts"
import { landing } from "akasha/command/modules/landing/landing.module.code.ts"
import { rowsIn } from "akasha/command/modules/landing/landing.module.test-fixtures.ts"
import { TOGETHER } from "akasha/command/modules/orphaning/orphaning.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import { indexIn } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ADMITS: Judging = { named: ["admits"], checksFor: () => ["admits"], over: async () => [] }

const TREE = "akasha"

const TYPE_AT = `${TREE}/module.page-type.ts`

const A = "akasha/a.module.ts"

const B = "akasha/b.module.ts"

const C = "akasha/c.module.ts"

const X = "akasha/x.module.ts"

const Y = "akasha/y.module.ts"

const HELD = "export const a = 1\n"

const IMPORTS = 'import { a } from "./a.module.ts"\n\nexport const b = a\n'

const ALONE = "export const b = 1\n"

const AGAIN = 'import { a } from "./c.module.ts"\n\nexport const b = a\n'

function pageTyped(root: string): undefined {
  mkdirSync(join(root, TREE), { recursive: true })
  writeFileSync(join(root, TYPE_AT), `export const held = ${JSON.stringify(modulePage, null, 2)}\n`)
}

async function setUp(): Promise<string> {
  const root = scratch.rootFor("akasha-orphaning-")
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  writeFileSync(join(root, "seed.txt"), "held\n")
  pageTyped(root)
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "first"])
  mkdirSync(indexIn(root), { recursive: true })
  listedFiled(root, slugOf(modulePage.type), modulePage.slug, [
    { path: TYPE_AT, id: modulePage.id },
  ])
  const put = await landing(
    root,
    rowsIn(root, [
      { path: A, body: bytesOf(HELD) },
      { path: B, body: bytesOf(IMPORTS) },
      { path: X, body: bytesOf("export const x = 1\n") },
      { path: Y, body: bytesOf('import { x } from "./x.module.ts"\n\nexport const y = x\n') },
    ]),
    "a and b are there, and so is an edge neither of them makes",
    ADMITS
  )
  expect("refusals" in put).toBe(false)
  return root
}

test("a path something still imports is refused, and what imports it is named", async () => {
  const root = await setUp()
  const said = await landing(root, rowsIn(root, [{ path: A, body: null }]), "a goes", ADMITS)
  expect("refusals" in said).toBe(true)
  const why = (said as Refused).refusals.join("\n")
  expect(why).toContain(A)
  expect(why).toContain(B)
  expect(why).toContain(TOGETHER)
})

test("a path taken away beside the edit dropping its import lands", async () => {
  const root = await setUp()
  const said = await landing(
    root,
    rowsIn(root, [
      { path: A, body: null },
      { path: B, body: bytesOf(ALONE) },
    ]),
    "a goes as b lets it go",
    ADMITS
  )
  expect("refusals" in said).toBe(false)
  expect((said as Landed).took).toContain(A)
})

test("a path carried away that something still imports is refused", async () => {
  const root = await setUp()
  const said = await landing(
    root,
    [
      ...rowsIn(root, [{ path: "seed.txt", body: bytesOf("touched\n") }]),
      { kind: "move", pathFrom: A, pathTo: "akasha/moved.module.ts" },
    ],
    "a is carried off",
    ADMITS
  )
  expect("refusals" in said).toBe(true)
  const why = (said as Refused).refusals.join("\n")
  expect(why).toContain(A)
  expect(why).toContain(B)
})

test("a path taken away with its importers repointed onto where it arrives lands", async () => {
  const root = await setUp()
  const said = await landing(
    root,
    rowsIn(root, [
      { path: A, body: null },
      { path: C, body: bytesOf(HELD) },
      { path: B, body: bytesOf(AGAIN) },
    ]),
    "a moves to c and b follows",
    ADMITS
  )
  expect("refusals" in said).toBe(false)
  expect((said as Landed).took).toContain(A)
})
