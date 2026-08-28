import { expect, test } from "bun:test"
import { akashaRoot } from "../../../repo/roots/roots.ts"
import type { Batch, CheckFailure } from "../check-shape.ts"
import pageHoldsToItsType from "./page-holds-to-its-type.check.code.attachment.ts"

const ROOT = akashaRoot()

const AT = "checks/check/trial/trial.check.md"

const ELSEWHERE_TYPE = "checks-system/check/trial/trial-elsewhere.page-type.md"

const ELSEWHERE_AT = "trials/held/somewhere.md"

const ELSEWHERE = `---\n${[
  "page-type-slug: page-type",
  'title: "Trial elsewhere"',
  "id: 019ffe7e-71c1-7000-a7df-4459081f9000",
  "extends-slug: page",
  "files: code-editor:trials/**/*.md",
  "body-shape-slug: empty",
  "slug: trial-elsewhere",
  "domain-parent-slug: domain/checks-system",
].join("\n")}\n---\n\n# Definition\n\n- **Trial elsewhere** — a page type a test files into another repository.\n`

const stating = (keys: readonly string[], definition: string): string =>
  `---\n${["page-type-slug: check", 'title: "Trial"', "slug: trial", "needs: tree", ...keys].join("\n")}\n---\n\n# Definition\n\n- **Trial** — ${definition}\n`

const HELD = stating([], "a page a test writes, held to the shape `check` states.")

const OVER = "a page a test writes, over what the shape bounds. ".repeat(4).trim()

function verdict(bodies: Readonly<Record<string, string>>): readonly CheckFailure[] {
  const paths = Object.keys(bodies).map((one) => `${ROOT}/${one}`)
  const batch: Batch = {
    root: ROOT,
    paths,
    tree: {
      root: ROOT,
      at: (path) => {
        const body = bodies[path.slice(ROOT.length + 1)]
        return body === undefined ? null : Buffer.from(body)
      },
      paths: () => paths,
      gone: () => [],
      goneElsewhere: () => [],
      repointedElsewhere: () => new Map(),
      dir: () => ROOT,
    },
    keep: () => "",
  }
  return (pageHoldsToItsType.run as (given: Batch) => readonly CheckFailure[])(batch)
}

test("a page holding to its page type is not refused", () => {
  expect(verdict({ [AT]: HELD })).toEqual([])
})

test("a part over what the shape bounds is refused, naming the shape and the bound", () => {
  const failures = verdict({ [AT]: stating([], OVER) })
  expect(failures).toHaveLength(1)
  expect(failures[0]!.path).toBe(`${ROOT}/${AT}`)
  expect(failures[0]!.reason).toContain("outside the shape its page type states")
  expect(failures[0]!.reason).toContain("at most 100 characters")
})

test("a key the page type declares nowhere is refused, naming the key", () => {
  const failures = verdict({ [AT]: stating(["nonsense-key: whatever"], "a page a test writes.") })
  expect(failures).toHaveLength(1)
  expect(failures[0]!.reason).toContain("nonsense-key")
})

test("a body outside the shape and a key outside the properties are both refused in one act", () => {
  expect(verdict({ [AT]: stating(["nonsense-key: whatever"], OVER) })).toHaveLength(2)
})

test("a path no page type claims is not judged", () => {
  expect(verdict({ "checks-system/checks.ts": "export const CHECKS = []\n" })).toEqual([])
  expect(verdict({ "notes/loose.md": "# Loose\n\nA markdown file no page type claims.\n" })).toEqual([])
})

test("a path a page type files into another repository is refused, naming both", () => {
  const failures = verdict({
    [ELSEWHERE_TYPE]: ELSEWHERE,
    [ELSEWHERE_AT]: "# Anything\n\nA body no shape standing here bounds.\n",
  })
  expect(failures).toHaveLength(1)
  expect(failures[0]!.path).toBe(`${ROOT}/${ELSEWHERE_AT}`)
  expect(failures[0]!.reason).toContain("`trial-elsewhere` page type on the code-editor repo")
  expect(failures[0]!.reason).toContain("this call addresses the akasha repo")
})

test("a path this repository's own page type claims is judged here rather than refused", () => {
  expect(verdict({ [AT]: HELD })).toEqual([])
})
