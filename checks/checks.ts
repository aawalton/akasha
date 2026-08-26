import { createRequire } from "node:module"
import { dirname, resolve } from "node:path"
import { type BuildContext, KEEPS_NOTHING } from "../graph/build-context/build-context.ts"
import { frontmatterAt } from "../graph/frontmatter-at/frontmatter-at.ts"
import { pagesOfType } from "../graph/page-index/page-index.ts"
import type { PageAt } from "../page/page.ts"
import { AKASHA, akashaRoot } from "../repo/roots/roots.ts"
import type { Check } from "./check/check-shape.ts"

const PAGE_TYPE = "mp-check"

const ON_PATCH = "check-on-patch"

const load = createRequire(`${import.meta.dir}/checks.ts`)

type Found = {
  readonly every: readonly Check[]
  readonly onPatch: readonly Check[]
}

function contextOn(root: string): BuildContext {
  return { roots: { [AKASHA]: root }, said: KEEPS_NOTHING }
}

function moduleOf(root: string, at: PageAt): string {
  return resolve(root, dirname(at.key), `${at.stem}.ts`)
}

function checkAt(root: string, at: PageAt): Check {
  const file = moduleOf(root, at)
  const said = (load(file) as { readonly default?: unknown }).default
  if (said === null || typeof said !== "object") {
    throw new Error(`${at.key} is a check page, so ${file} must export the check it names as its default`)
  }
  const check = said as Check
  if (check.slug !== at.stem) {
    throw new Error(`${file} exports the check \`${check.slug}\`, beside the page for \`${at.stem}\``)
  }
  return check
}

function runsOnPatch(ctx: BuildContext, at: PageAt): boolean {
  const fm = frontmatterAt(ctx, at.repo, at.key)
  if (fm === null) return true
  const said = fm.fields.get(ON_PATCH)
  return said !== false && said !== "false"
}

function foundIn(root: string): Found {
  const ctx = contextOn(root)
  const pages = [...pagesOfType(ctx, PAGE_TYPE)].sort((one, two) => (one.stem < two.stem ? -1 : 1))
  const every: Check[] = []
  const onPatch: Check[] = []
  for (const at of pages) {
    const check = checkAt(root, at)
    every.push(check)
    if (runsOnPatch(ctx, at)) onPatch.push(check)
  }
  return { every, onPatch }
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
