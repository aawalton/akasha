import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, realpathSync, symlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { rootOf } from "@akasha/command-system/rooting"
import { scratchWorld } from "@akasha/command-system/scratching"
import type { Change } from "@akasha/pages-system/change"
import { shadowAsked } from "@akasha/pages-system/shadow"
import {
  change,
  gone,
  proposing,
} from "../../../modules/check-scratch/check-scratch.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  carriedIn,
  judgedOf,
  lintClean,
  lookedAt,
  outsideOf,
  reasonOf,
} from "./lint-clean.code-check.code.ts"

const REPO_AT = rootOf(import.meta.dir)

const MODULES = "node_modules"

const CONFIG = "biome.json"

const SETTINGS =
  '{"formatter":{"enabled":false},"assist":{"enabled":false},"linter":{"rules":' +
  '{"recommended":false,"correctness":{"noUnusedVariables":"error"}}}}\n'

const CLEAN = "export function held(): number {\n  return 1\n}\n"

const UNUSED = "export function held(): number {\n  const spare = 2\n  return 1\n}\n"

const RULE = "lint/correctness/noUnusedVariables"

const STYLED = ".readout-ring {\n  color: red;\n}\n"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function linted(held: Change): readonly Judged[] {
  return lintClean(held, shadowAsked(held))
}

function repo(files: Record<string, string>, linter = true): string {
  const root = realpathSync(scratch.rootFor("lint-clean-"))
  writeFileSync(join(root, CONFIG), SETTINGS)
  if (linter) symlinkSync(join(REPO_AT, MODULES), join(root, MODULES))
  for (const [name, body] of Object.entries(files)) {
    const at = join(root, name)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  return root
}

test("the files judged are the ones the linter reads, said once and in order", () => {
  const root = repo({
    "akasha/two.ts": CLEAN,
    "akasha/one.ts": CLEAN,
    "akasha/held.tsx": CLEAN,
    "akasha/held.css": STYLED,
    "akasha/held.md": "held",
  })
  const changed = [
    "akasha/two.ts",
    "akasha/one.ts",
    "akasha/two.ts",
    "akasha/held.tsx",
    "akasha/held.css",
    "akasha/held.md",
  ]
  expect(carriedIn(change(root, changed))).toEqual([
    "akasha/held.css",
    "akasha/held.tsx",
    "akasha/one.ts",
    "akasha/two.ts",
  ])
})

test("a stylesheet and a body written with JSX are both read, and a note is not", () => {
  expect(lookedAt("akasha/one.css")).toBe(true)
  expect(lookedAt("akasha/one.tsx")).toBe(true)
  expect(lookedAt("akasha/one.ts")).toBe(true)
  expect(lookedAt("akasha/one.md")).toBe(false)
})

test("a file the change takes away is judged by nothing", () => {
  const root = repo({ "akasha/one.ts": CLEAN })
  expect(carriedIn(change(root, ["akasha/one.ts"], gone))).toEqual([])
})

test("a change carrying no file the linter reads is judged by no run", () => {
  const root = repo({ "akasha/held.md": "held" })
  expect(linted(change(root, ["akasha/held.md"]))).toEqual([])
})

test("a change the linter finds nothing in is not refused", () => {
  const root = repo({ "akasha/one.ts": CLEAN })
  expect(linted(change(root, ["akasha/one.ts"]))).toEqual([])
})

test("a change the linter finds fault in is refused, and the reason names the rule", () => {
  const root = repo({ "akasha/one.ts": UNUSED })
  const said = linted(change(root, ["akasha/one.ts"]))
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/one.ts")
  expect(said[0]?.reason).toContain(RULE)
  expect(said[0]?.reason).toContain("This variable spare is unused.")
})

test("every finding is answered, each against the file it stands in", () => {
  const root = repo({ "akasha/one.ts": UNUSED, "akasha/two.ts": UNUSED })
  const said = linted(change(root, ["akasha/one.ts", "akasha/two.ts"]))
  expect(said.map((one) => one.path)).toEqual(["akasha/one.ts", "akasha/two.ts"])
})

test("a change is judged by the body it proposes, not the one standing on disk", () => {
  const root = repo({ "akasha/one.ts": CLEAN })
  const at = proposing(root, "akasha/one.ts", UNUSED)
  const said = linted(change(root, ["akasha/one.ts"], at))
  expect(said.length).toBe(1)
  expect(said[0]?.reason).toContain(RULE)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe(CLEAN)
  expect(linted(change(root, ["akasha/one.ts"]))).toEqual([])
})

test("a change taking a fault away passes, though the fault still stands on disk", () => {
  const root = repo({ "akasha/one.ts": UNUSED })
  const at = proposing(root, "akasha/one.ts", CLEAN)
  expect(linted(change(root, ["akasha/one.ts"], at))).toEqual([])
})

test("a linter that could not run is a refusal, not a pass", () => {
  const root = repo({ "akasha/one.ts": CLEAN }, false)
  const said = linted(change(root, ["akasha/one.ts"]))
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/one.ts")
  expect(said[0]?.reason).toContain("nothing was looked at")
  expect(said[0]?.reason).toContain("verified nothing")
})

test("the reason names no tree that has been swept", () => {
  const root = repo({ "akasha/one.ts": CLEAN }, false)
  const said = linted(change(root, ["akasha/one.ts"]))
  expect(said[0]?.reason).not.toContain("/var/tmp/akasha-world-")
  expect(said[0]?.reason).toContain("the world this change was stood up in")
})

test("the world's root is taken out of what is reported", () => {
  expect(outsideOf("held at /held/one.ts, under /held", "/held")).toBe(
    "held at one.ts, under the world this change was stood up in"
  )
})

test("a finding is said as its rule, where it stands and what the linter said", () => {
  const found = { path: "akasha/one.ts", line: 12, column: 7, rule: RULE, said: "This is unused." }
  expect(reasonOf(found)).toBe(`\`${RULE}\` at line 12, column 7 — This is unused.`)
})

test("a run that failed is answered against the first file named", () => {
  const linted = { code: -1, errors: 0, found: [], failed: "nothing stands under /held" }
  const said = judgedOf(linted, "akasha/one.ts", "/held")
  expect(said.length).toBe(1)
  expect(said[0]?.path).toBe("akasha/one.ts")
  expect(said[0]?.reason).toBe(
    "nothing stands under the world this change was stood up in. A linter that could not look has verified nothing, so this change is not judged."
  )
})
