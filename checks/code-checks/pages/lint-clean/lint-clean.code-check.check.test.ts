import { afterAll, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { lintClean } from "akasha/checks/code-checks/pages/lint-clean/lint-clean.code-check.check.code.ts"
import { CONFIG } from "akasha/checks/code-checks/pages/lint-clean/lint-clean.code-check.decision.code.ts"
import {
  CLEAN,
  RELAXED,
  RULE,
  repo,
  scratch,
  UNUSED,
} from "akasha/checks/code-checks/pages/lint-clean/lint-clean.code-check.decision.test-fixtures.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { change, proposing } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import { shadowAsked } from "akasha/pages/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

function linted(held: Change): readonly Judged[] {
  return lintClean(held, shadowAsked(held))
}

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
  const judged = linted(change(root, ["akasha/one.ts"]))
  expect(judged.length).toBe(1)
  expect(judged[0]?.path).toBe("akasha/one.ts")
  expect(judged[0]?.reason).toContain(RULE)
  expect(judged[0]?.reason).toContain("This variable spare is unused.")
})

test("every finding is answered, each against the file it is in", () => {
  const root = repo({ "akasha/one.ts": UNUSED, "akasha/two.ts": UNUSED })
  const judged = linted(change(root, ["akasha/one.ts", "akasha/two.ts"]))
  expect(judged.map((one) => one.path)).toEqual(["akasha/one.ts", "akasha/two.ts"])
})

test("a change is judged by the body it proposes, not the one on disk", () => {
  const root = repo({ "akasha/one.ts": CLEAN })
  const at = proposing(root, "akasha/one.ts", UNUSED)
  const judged = linted(change(root, ["akasha/one.ts"], at))
  expect(judged.length).toBe(1)
  expect(judged[0]?.reason).toContain(RULE)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe(CLEAN)
  expect(linted(change(root, ["akasha/one.ts"]))).toEqual([])
})

test("a change taking a fault away passes, though the fault is still on disk", () => {
  const root = repo({ "akasha/one.ts": UNUSED })
  const at = proposing(root, "akasha/one.ts", CLEAN)
  expect(linted(change(root, ["akasha/one.ts"], at))).toEqual([])
})

test("a change turning the config is judged under the config it turns to", () => {
  const root = repo({ "akasha/one.ts": UNUSED })
  expect(linted(change(root, ["akasha/one.ts"])).length).toBe(1)
  const at = proposing(root, CONFIG, RELAXED)
  expect(linted(change(root, ["akasha/one.ts", CONFIG], at))).toEqual([])
})

test("a linter that could not run is a refusal, not a pass", () => {
  const root = repo({ "akasha/one.ts": CLEAN }, false)
  const judged = linted(change(root, ["akasha/one.ts"]))
  expect(judged.length).toBe(1)
  expect(judged[0]?.path).toBe("akasha/one.ts")
  expect(judged[0]?.reason).toContain("nothing was looked at")
  expect(judged[0]?.reason).toContain("verified nothing")
})

test("the reason names the tree that stays rather than the one that is swept", () => {
  const root = repo({ "akasha/one.ts": CLEAN }, false)
  const judged = linted(change(root, ["akasha/one.ts"]))
  expect(judged[0]?.reason).not.toContain("/var/tmp/akasha-mirror-")
  expect(judged[0]?.reason).toContain(root)
})
