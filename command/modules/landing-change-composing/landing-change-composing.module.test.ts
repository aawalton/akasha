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
import {
  besideBefore,
  besideRebased,
} from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"

afterAll(scratch.sweep)

const BYTES = new TextEncoder()

const TEXT = new TextDecoder()

const REFERENCED = "akasha/a.domain.referenced-by.jsonl"

const naming = (slug: string): string =>
  `{"propertySlug":"import","path":"akasha/${slug}.domain.ts"}`

test("a beside file the tree no longer holds leaves the body this landing composed alone", () => {
  const root = scratch.rootFor("akasha-composing-")
  const was = `${naming("one")}\n${naming("two")}\n`
  const then = `${naming("new")}\n${naming("one")}\n${naming("two")}\n`
  const held = besideBefore([
    { kind: "replace", path: REFERENCED, contentFrom: was, contentTo: then },
  ])
  const said = besideRebased(root, [{ path: REFERENCED, body: BYTES.encode(then) }], held)
  const body = said[0]?.body
  expect(body === undefined || body === null ? null : TEXT.decode(body)).toBe(then)
})

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
