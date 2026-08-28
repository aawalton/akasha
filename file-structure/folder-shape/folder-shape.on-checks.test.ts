import { expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { type BuildContext, KEEPS_NOTHING } from "../../graph/build-context/build-context.ts"
import {
  CODED,
  ENFORCED,
  type FolderShapeStatus,
  HYPOTHESIS,
  statusesOver,
} from "./folder-shape.ts"

const SCRATCH = "/var/tmp"

const REPO = "scratch"

const CHECK_KEY = "checks-system/check/named/named.check.md"

const REFUSES_NOTHING = "check-on-patch: false\ncheck-on-worktree: false\ncheck-on-audit: false\n"

const REFUSES_A_PATCH = "check-on-patch: true\ncheck-on-worktree: false\ncheck-on-audit: false\n"

function shapeKey(slug: string): string {
  return `pages/folder-shape/${slug}.folder-shape.md`
}

function shapeSaying(slug: string, body: string): string {
  return `---
page-type-slug: folder-shape
title: "${slug}"
slug: ${slug}
${body}---

# Definition

- **${slug}** — a shape under test.
`
}

function checkSaying(body: string): string {
  return `---
page-type-slug: check
title: "Named"
slug: named
needs: tree
${body}---

# Definition

- **Named** — the check under test.
`
}

function repoAt(files: Readonly<Record<string, string>>): string {
  const root = mkdtempSync(`${SCRATCH}/folder-shape-`)
  execFileSync("git", ["-C", root, "init", "-q"])
  for (const [key, body] of Object.entries(files)) {
    mkdirSync(dirname(`${root}/${key}`), { recursive: true })
    writeFileSync(`${root}/${key}`, body)
  }
  execFileSync("git", ["-C", root, "add", "-A"])
  return root
}

function statusesFor(
  files: Readonly<Record<string, string>>
): ReadonlyMap<string, FolderShapeStatus> {
  const root = repoAt(files)
  try {
    const ctx: BuildContext = { roots: { [REPO]: root }, said: KEEPS_NOTHING }
    return statusesOver(ctx)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

function statusBeside(checkBody: string): FolderShapeStatus | undefined {
  return statusesFor({
    [shapeKey("one")]: shapeSaying("one", "check-slug: named\n"),
    [CHECK_KEY]: checkSaying(checkBody),
  }).get("one")
}

test("a shape naming a check that refuses nothing is coded", () => {
  expect(statusBeside(REFUSES_NOTHING)).toBe(CODED)
})

test("a shape naming a check that refuses a patch is enforced", () => {
  expect(statusBeside(REFUSES_A_PATCH)).toBe(ENFORCED)
})

test("a shape naming a check that refuses a worktree is enforced", () => {
  const body = "check-on-patch: false\ncheck-on-worktree: true\ncheck-on-audit: false\n"
  expect(statusBeside(body)).toBe(ENFORCED)
})

test("a shape naming a check that only audits is coded", () => {
  const body = "check-on-patch: false\ncheck-on-worktree: false\ncheck-on-audit: true\n"
  expect(statusBeside(body)).toBe(CODED)
})

test("a shape naming a check that stands down nowhere is enforced", () => {
  expect(statusBeside("cached: false\n")).toBe(ENFORCED)
})

test("a shape naming a check that is not here is a hypothesis", () => {
  const statuses = statusesFor({ [shapeKey("one")]: shapeSaying("one", "check-slug: absent\n") })
  expect(statuses.get("one")).toBe(HYPOTHESIS)
})

test("a shape naming no check is a hypothesis", () => {
  const statuses = statusesFor({
    [shapeKey("one")]: shapeSaying("one", ""),
    [CHECK_KEY]: checkSaying(REFUSES_NOTHING),
  })
  expect(statuses.get("one")).toBe(HYPOTHESIS)
})

test("the check it names refusing a patch is what moves a shape from coded to enforced", () => {
  const shape = shapeSaying("one", "check-slug: named\n")
  const coded = statusesFor({ [shapeKey("one")]: shape, [CHECK_KEY]: checkSaying(REFUSES_NOTHING) })
  const enforced = statusesFor({
    [shapeKey("one")]: shape,
    [CHECK_KEY]: checkSaying(REFUSES_A_PATCH),
  })
  expect([coded.get("one"), enforced.get("one")]).toEqual([CODED, ENFORCED])
})

test("every shape naming one check reads that check's status", () => {
  const statuses = statusesFor({
    [shapeKey("one")]: shapeSaying("one", "check-slug: named\n"),
    [shapeKey("two")]: shapeSaying("two", "check-slug: named\n"),
    [CHECK_KEY]: checkSaying(REFUSES_A_PATCH),
  })
  expect([...statuses.entries()]).toEqual([
    ["one", ENFORCED],
    ["two", ENFORCED],
  ])
})
