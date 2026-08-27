import type { Stated } from "../../page/index/identity/identity.ts"
import { indexFreshFor, loadPages } from "../../page/index/store/store.ts"
import { pageNameOf } from "../../page/name/name.ts"
import type { PageAt } from "../../page/page.ts"
import { pagesIn } from "../../page/tracked/tracked.ts"
import type { BuildContext } from "../build-context/build-context.ts"

export type PageIndex = {
  readonly byType: ReadonlyMap<string, readonly PageAt[]>
  readonly byName: ReadonlyMap<string, readonly PageAt[]>
}

const HELD = new WeakMap<BuildContext, PageIndex>()

const STATED = new WeakMap<BuildContext, readonly Stated[]>()

export function nameOf(type: string, stem: string): string {
  return `${type}/${stem}`
}

export function pagesOver(repo: string, keys: Iterable<string>): readonly PageAt[] {
  const found: PageAt[] = []
  for (const key of keys) {
    const named = pageNameOf(key)
    if (named === null) continue
    found.push({ repo, key, stem: named.stem, type: named.type })
  }
  return found
}

export function indexOf(pages: Iterable<PageAt>): PageIndex {
  const byType = new Map<string, PageAt[]>()
  const byName = new Map<string, PageAt[]>()
  for (const at of pages) {
    const typed = byType.get(at.type)
    if (typed === undefined) byType.set(at.type, [at])
    else typed.push(at)
    const name = nameOf(at.type, at.stem)
    const named = byName.get(name)
    if (named === undefined) byName.set(name, [at])
    else named.push(at)
  }
  return { byType, byName }
}

export function statedIn(ctx: BuildContext): readonly Stated[] {
  const held = STATED.get(ctx)
  if (held !== undefined) return held
  const made = loadPages().filter((one) => ctx.roots[one.repo] !== undefined)
  STATED.set(ctx, made)
  return made
}

/**
 * The index's rows are believed only where its mark still matches the tree.
 *
 * A ROW NAMES A PATH, AND A PATH GOES STALE. Where a page file moved or went after the index was
 * written, the rows still name where it was: `frontmatterAt` then reads nothing there and every
 * reader takes the empty answer for the page's own words. A check read that way reads as one
 * with no `check-on-patch: false` in it, which is a check that RUNS — so a drifted index turns
 * every stood-down check on at once, and the first thing anyone sees is thousands of violations
 * nowhere near the change that caused them.
 *
 * SO THE TREE IS READ INSTEAD, rather than refusing. `pagesIn` is one `git ls-files` and answers
 * exactly what this function needs; it was already the path taken for a repository the index
 * holds no row for. Refusing would be louder than serving a wrong answer and still wrong: the
 * caller wants the pages, they are cheaply knowable, and `memory` drifts as a matter of course.
 */
function madeOver(ctx: BuildContext): PageIndex {
  const indexed = new Map<string, PageAt[]>()
  for (const one of statedIn(ctx)) {
    const held = indexed.get(one.repo) ?? []
    held.push({ repo: one.repo, key: one.key, stem: one.stem, type: one.type })
    indexed.set(one.repo, held)
  }
  const pages: PageAt[] = []
  for (const [repo, root] of Object.entries(ctx.roots)) {
    if (root === undefined) continue
    const held = indexed.get(repo)
    if (held !== undefined && indexFreshFor(repo, root)) {
      pages.push(...held)
      continue
    }
    for (const page of pagesIn(root)) pages.push({ repo, key: page.key, stem: page.stem, type: page.type })
  }
  return indexOf(pages)
}

export function pageIndexIn(ctx: BuildContext): PageIndex {
  const held = HELD.get(ctx)
  if (held !== undefined) return held
  const made = madeOver(ctx)
  HELD.set(ctx, made)
  return made
}

export function pagesOfType(ctx: BuildContext, type: string): readonly PageAt[] {
  return pageIndexIn(ctx).byType.get(type) ?? []
}

