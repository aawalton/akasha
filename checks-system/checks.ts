import { createRequire } from "node:module"
import { resolve } from "node:path"
import { type BuildContext, KEEPS_NOTHING } from "../graph/build-context/build-context.ts"
import { frontmatterAt } from "../graph/frontmatter-at/frontmatter-at.ts"
import { pagesOfType } from "../graph/page-index/page-index.ts"
import { attachmentFileOf } from "../page/attachment-file.ts"
import type { PageAt } from "../page/page.ts"
import { AKASHA, akashaRoot } from "../repo/roots/roots.ts"
import type { Check } from "./check/check-shape.ts"

const PAGE_TYPE = "check"

const ON_PATCH = "check-on-patch"

const ON_WORKTREE = "check-on-worktree"

const ON_AUDIT = "check-on-audit"

const CHECKS_AT = "checks-system/checks.ts"

const CODE_KEY = "code"

const CODE_EXTENSION = "ts"

function loaderIn(root: string): ReturnType<typeof createRequire> {
  return createRequire(resolve(root, CHECKS_AT))
}

type Found = {
  readonly every: readonly Check[]
  readonly onPatch: readonly Check[]
  readonly onWorktree: readonly Check[]
  readonly onAudit: readonly Check[]
}

function contextOn(root: string): BuildContext {
  return { roots: { [AKASHA]: root }, said: KEEPS_NOTHING }
}

function moduleOf(root: string, at: PageAt): string {
  return resolve(root, attachmentFileOf(at.key, CODE_KEY, CODE_EXTENSION))
}

function checkAt(root: string, at: PageAt): Check {
  const file = moduleOf(root, at)
  const said = (loaderIn(root)(file) as { readonly default?: unknown }).default
  if (said === null || typeof said !== "object") {
    throw new Error(`${at.key} is a check page, so ${file} must export the check it names as its default`)
  }
  const check = said as Check
  if (check.slug !== at.stem) {
    throw new Error(`${file} exports the check \`${check.slug}\`, beside the page for \`${at.stem}\``)
  }
  return check
}

function runsOn(ctx: BuildContext, at: PageAt, key: string): boolean {
  const fm = frontmatterAt(ctx, at.repo, at.key)
  if (fm === null) {
    throw new Error(
      `${at.key} is a check page and nothing at that path reads as frontmatter, so what it says ` +
        `about \`${key}\` cannot be known. Where the path is right and the file is not, the tree is ` +
        "mid-repair; where the file is right, write the page index again with `ops index refresh`"
    )
  }
  const said = fm.fields.get(key)
  return said !== false && said !== "false"
}

export function refusesChange(ctx: BuildContext, at: PageAt): boolean {
  return runsOn(ctx, at, ON_PATCH) || runsOn(ctx, at, ON_WORKTREE)
}

function foundIn(root: string): Found {
  const ctx = contextOn(root)
  const pages = [...pagesOfType(ctx, PAGE_TYPE)].sort((one, two) => (one.stem < two.stem ? -1 : 1))
  const every: Check[] = []
  const onPatch: Check[] = []
  const onWorktree: Check[] = []
  const onAudit: Check[] = []
  for (const at of pages) {
    const phases = [ON_PATCH, ON_WORKTREE, ON_AUDIT].filter((one) => runsOn(ctx, at, one))
    let check: Check
    try {
      check = checkAt(root, at)
    } catch (thrown) {
      if (phases.length === 0) continue
      const said = thrown instanceof Error ? thrown.message : String(thrown)
      throw new Error(
        `${at.key} says it runs on ${phases.join(", ")}, and the check it names will not load: ${said}`
      )
    }
    every.push(check)
    if (phases.includes(ON_PATCH)) onPatch.push(check)
    if (phases.includes(ON_WORKTREE)) onWorktree.push(check)
    if (phases.includes(ON_AUDIT)) onAudit.push(check)
  }
  return { every, onPatch, onWorktree, onAudit }
}

let held: { readonly root: string; readonly found: Found } | null = null

function heldFor(root: string): Found {
  if (held !== null && held.root === root) return held.found
  const found = foundIn(root)
  held = { root, found }
  return found
}

export function checksFound(root: string = akashaRoot()): readonly Check[] {
  return heldFor(root).every
}

export function checksOnPatch(root: string = akashaRoot()): readonly Check[] {
  return heldFor(root).onPatch
}

export function checksOnWorktree(root: string = akashaRoot()): readonly Check[] {
  return heldFor(root).onWorktree
}

export function checksOnAudit(root: string = akashaRoot()): readonly Check[] {
  return heldFor(root).onAudit
}
