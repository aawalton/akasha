import { type Dirent, readdirSync } from "node:fs"
import { join } from "node:path"
import {
  commitThere,
  type Entry,
  namesAt,
} from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { told } from "akasha/git/modules/running/git-running.module.code.ts"
import { INDEX_AT } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { VENDOR_ROOT } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const PAGE_TYPE = "page-type"

const UNWALKED = new Set<string>([VENDOR_ROOT, ".git", INDEX_AT])

const LOCK = ".lock"

export function walkedUnder(
  at: string,
  taking: (name: string) => boolean,
  entering: (path: string) => boolean = () => true
): readonly string[] {
  const found: string[] = []
  const walk = (here: string): undefined => {
    for (const one of readdirSync(here, { withFileTypes: true })) {
      const next = join(here, one.name)
      if (one.isDirectory()) {
        if (UNWALKED.has(one.name) || one.name.endsWith(LOCK)) continue
        if (!entering(next)) continue
        walk(next)
      } else if (taking(one.name)) found.push(next)
    }
  }
  walk(at)
  return found
}

const HEADS = new Map<string, string | null>()

const NOTHING: ReadonlyMap<string, Entry> = new Map()

function commitOf(root: string, base: string | null): string | null {
  if (base !== null) return base
  const found = HEADS.get(root)
  if (found !== undefined) return found
  const said = told(root, ["rev-parse", "HEAD"])
  const made = said === null ? null : said.trim()
  HEADS.set(root, made)
  return made
}

function carriedIn(
  root: string,
  folder: string,
  base: string | null
): ReadonlyMap<string, Entry> | null {
  const commit = commitOf(root, base)
  if (commit === null || !commitThere(root, commit)) return null
  return namesAt(root, commit, folder) ?? NOTHING
}

function sittingIn(root: string, folder: string, base: string | null): readonly Dirent[] {
  let here: readonly Dirent[] = []
  try {
    here = readdirSync(join(root, folder), { withFileTypes: true })
  } catch {
    return []
  }
  if (here.length === 0) return here
  const held = carriedIn(root, folder, base)
  if (held === null) return here
  return here.filter((one) => held.has(one.name))
}

export function filesIn(
  root: string,
  folder: string,
  base: string | null = null
): readonly string[] {
  return sittingIn(root, folder, base)
    .filter((one) => !one.isDirectory())
    .map((one) => join(folder, one.name))
    .sort()
}

export function pagesUnder(tree: string): readonly string[] {
  const found = walkedUnder(tree, (name) => partedIn(name)?.sections.length === 0)
  const pageTypes = new Set<string>([PAGE_TYPE])
  for (const one of found) {
    const said = partedIn(one)
    if (said?.pageType === PAGE_TYPE) pageTypes.add(said.slug)
  }
  return found.filter((one) => pageTypes.has(partedIn(one)?.pageType ?? ""))
}
