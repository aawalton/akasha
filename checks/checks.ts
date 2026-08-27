import { createRequire } from "node:module"
import { dirname, resolve } from "node:path"
import { type BuildContext, KEEPS_NOTHING } from "../graph/build-context/build-context.ts"
import { frontmatterAt } from "../graph/frontmatter-at/frontmatter-at.ts"
import { pagesOfType } from "../graph/page-index/page-index.ts"
import type { PageAt } from "../page/page.ts"
import { AKASHA, akashaRoot } from "../repo/roots/roots.ts"
import type { Check } from "./check/check-shape.ts"

const PAGE_TYPE = "check"

const ON_PATCH = "check-on-patch"

const ON_WORKTREE = "check-on-worktree"

const ON_AUDIT = "check-on-audit"

const CHECKS_AT = "checks/checks.ts"

// BUILT WHEN A CHECK IS LOADED, NOT AT IMPORT. `import.meta` is empty in a CommonJS bundle, so
// this read `undefined/checks.ts` and `createRequire` refused a filename that was not an
// absolute path — thrown while the module was still loading, which took down every build that
// imports this file for anything else. The editor extension was one, and it loaded nothing.
//
// FROM THE ROOT BEING CHECKED. The paths handed to the result are absolute already, so what it
// resolves against only has to be some real absolute path, and that root is one this file was
// given rather than one it has to work out.
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
  return resolve(root, dirname(at.key), `${at.stem}.ts`)
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
  if (fm === null) return true
  const said = fm.fields.get(key)
  return said !== false && said !== "false"
}

function foundIn(root: string): Found {
  const ctx = contextOn(root)
  const pages = [...pagesOfType(ctx, PAGE_TYPE)].sort((one, two) => (one.stem < two.stem ? -1 : 1))
  const every: Check[] = []
  const onPatch: Check[] = []
  const onWorktree: Check[] = []
  const onAudit: Check[] = []
  for (const at of pages) {
    const check = checkAt(root, at)
    every.push(check)
    if (runsOn(ctx, at, ON_PATCH)) onPatch.push(check)
    if (runsOn(ctx, at, ON_WORKTREE)) onWorktree.push(check)
    if (runsOn(ctx, at, ON_AUDIT)) onAudit.push(check)
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
