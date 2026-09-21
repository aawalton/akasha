import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Judging } from "akasha/check/modules/judging/judging.module.code.ts"
import { landing } from "akasha/command/modules/landing/landing.module.code.ts"
import {
  git,
  repoWith,
  scratch,
} from "akasha/command/modules/landing/landing.module.test-fixtures.ts"

afterAll(scratch.sweep)

const BESIDE = "akasha/a.page-type.shapes.jsonl"

const rowFor = (slug: string, target: string): string =>
  JSON.stringify({
    pageTypeSlug: "a",
    targetPageTypeSlug: target,
    unique: null,
    uniquePropertySlug: null,
    slug,
    propertySlug: slug,
    fileName: null,
    folderName: null,
  })

const WAS = rowFor("a-zero", "zeta")

const NOW = rowFor("a-zero", "omega")

const MINE = rowFor("m-mine", "beta")

const OTHER = rowFor("o-other", "alpha")

test("a shapes row another landing filed while this one was judged is kept, and the row this one changed wins", async () => {
  const root = repoWith({ [BESIDE]: `${WAS}\n` })
  const overlapping: Judging = {
    named: ["overlapping"],
    checksFor: () => ["overlapping"],
    over: async () => {
      writeFileSync(join(root, BESIDE), `${WAS}\n${OTHER}\n`)
      git(root, ["add", "-A"])
      git(root, ["commit", "--quiet", "-m", "the other landing"])
      return []
    },
  }
  const rows: readonly FileChange[] = [
    { kind: "replace", path: BESIDE, contentFrom: `${WAS}\n`, contentTo: `${NOW}\n${MINE}\n` },
  ]
  expect("refusals" in (await landing(root, rows, "mine", overlapping))).toBe(false)
  expect(git(root, ["show", `HEAD:${BESIDE}`])).toBe(`${NOW}\n${MINE}\n${OTHER}\n`)
})
