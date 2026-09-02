import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { said as git } from "@akasha/git/git-running"
import { baseOf } from "../../../landing/landing.module.code.ts"
import { scratchWorld } from "../../../scratching/scratching.module.code.ts"
import { leftNaming, leftNamingSaid } from "./remove-naming.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const GOING = "temper/one/held.ts"

const NAMER = "tools/lib/reads.ts"

const INSIDE_AT = "akasha/one/reads.ts"

const BODY = `export const at = "temper/one/held.ts"\n`

function world(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-remove-naming-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  return root
}

test("a file naming what goes is found wherever it sits, inside the akasha folder or outside", () => {
  const root = world({ [GOING]: BODY, [NAMER]: BODY, [INSIDE_AT]: BODY })
  const found = leftNaming(root, baseOf(root), ["temper/one"], new Set([GOING]))
  expect("namers" in found ? found.namers : ["it refused"]).toEqual([INSIDE_AT, NAMER])
})

test("a file the removal takes is left out of what is answered", () => {
  const root = world({ [GOING]: BODY, "temper/one/other.ts": BODY })
  const going = new Set([GOING, "temper/one/other.ts"])
  const found = leftNaming(root, baseOf(root), ["temper/one"], going)
  expect("namers" in found ? found.namers : ["it refused"]).toEqual([])
})

test("a name a package name leads is found, since that is how a package is reached", () => {
  const root = world({ [GOING]: BODY, [NAMER]: `import "@temper/one/held.ts"\n` })
  const found = leftNaming(root, baseOf(root), ["temper/one"], new Set([GOING]))
  expect("namers" in found ? found.namers : ["it refused"]).toEqual([NAMER])
})

test("a caller naming nothing asks git nothing and is answered with no file", () => {
  const root = world({ [NAMER]: BODY })
  const found = leftNaming(root, "no-commit-of-that-name", [], new Set())
  expect("namers" in found ? found.namers : ["it refused"]).toEqual([])
})

test("a search git could not run is answered as a refusal rather than as nothing found", () => {
  const root = world({ [NAMER]: BODY })
  const found = leftNaming(root, "no-commit-of-that-name", ["temper/one"], new Set())
  expect("refusal" in found ? found.refusal : "").toContain("git could not say")
})

test("what was found and what was looked for are both said, and finding nothing is said too", () => {
  expect(leftNamingSaid([], [NAMER], false)).toEqual([])
  const none = leftNamingSaid(["temper/one"], [], true)
  expect(none[0]).toBe("no tracked file left behind names what would go")
  expect(none[1]).toContain("spelled as text")
  const some = leftNamingSaid(["temper/one"], [NAMER], false)
  expect(some[0]).toContain("what went is still named by 1 tracked file left behind")
  expect(some[0]).toContain(NAMER)
})
