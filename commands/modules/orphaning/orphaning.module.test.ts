import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as gitIn } from "@akasha/git/git-running"
import { bytesOf } from "@akasha/testing-system/bodying"
import type { Judging } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Landed, Refused } from "../landing/landing.module.code.ts"
import { landing } from "../landing/landing.module.code.ts"
import { rowsIn } from "../landing/landing.module.test-fixtures.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { TOGETHER } from "./orphaning.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ADMITS: Judging = { named: ["admits"], checksFor: () => ["admits"], over: async () => [] }

const A = "akasha/a.ts"

const B = "akasha/b.ts"

const C = "akasha/c.ts"

const X = "akasha/x.ts"

const Y = "akasha/y.ts"

const HELD = "export const a = 1\n"

const IMPORTS = 'import { a } from "./a.ts"\n\nexport const b = a\n'

const ALONE = "export const b = 1\n"

const AGAIN = 'import { a } from "./c.ts"\n\nexport const b = a\n'

async function setUp(): Promise<string> {
  const root = scratch.rootFor("akasha-orphaning-")
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  writeFileSync(join(root, "seed.txt"), "held\n")
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "first"])
  const put = await landing(
    root,
    rowsIn(root, [
      { path: A, body: bytesOf(HELD) },
      { path: B, body: bytesOf(IMPORTS) },
      { path: X, body: bytesOf("export const x = 1\n") },
      { path: Y, body: bytesOf('import { x } from "./x.ts"\n\nexport const y = x\n') },
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
      { kind: "move", pathFrom: A, pathTo: "akasha/moved.ts" },
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
