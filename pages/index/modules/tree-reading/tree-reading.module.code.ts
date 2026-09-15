import { type Dirent, readdirSync } from "node:fs"
import { join } from "node:path"
import { told } from "akasha/git/modules/running/git-running.module.code.ts"
import { INDEX_AT } from "akasha/pages/index/modules/surface/index-surface.module.code.ts"
import {
  QUARANTINE_ROOT,
  VENDOR_ROOT,
} from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"
import { partedIn } from "akasha/pages/modules/file-name/page-file-name.module.code.ts"

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
        if (here === at && one.name === QUARANTINE_ROOT) continue
        if (!entering(next)) continue
        walk(next)
      } else if (taking(one.name)) found.push(next)
    }
  }
  walk(at)
  return found
}

const OTHERS = new Map<string, ReadonlySet<string> | null>()

function addedSince(root: string, base: string): readonly string[] {
  const head = told(root, ["rev-parse", "HEAD"])
  if (head === null) return []
  const said = told(root, ["diff", "-z", "--name-only", "--diff-filter=A", base, head.trim()])
  return said === null ? [] : said.split("\0").filter((one) => one !== "")
}

function othersIn(root: string, base: string | null): ReadonlySet<string> | null {
  const key = base === null ? root : `${root}\0${base}`
  const found = OTHERS.get(key)
  if (found !== undefined) return found
  const said = told(root, ["ls-files", "-z", "--others", "--directory", "--no-empty-directory"])
  const made = said === null ? null : new Set<string>(said.split("\0").filter((one) => one !== ""))
  if (made !== null && base !== null) for (const one of addedSince(root, base)) made.add(one)
  OTHERS.set(key, made)
  return made
}

function carried(others: ReadonlySet<string>, path: string): boolean {
  if (others.has(path)) return false
  let at = path
  while (at !== "") {
    if (others.has(`${at}/`)) return false
    at = at.slice(0, Math.max(at.lastIndexOf("/"), 0))
  }
  return true
}

function sittingIn(root: string, folder: string, base: string | null): readonly Dirent[] {
  let here: readonly Dirent[] = []
  try {
    here = readdirSync(join(root, folder), { withFileTypes: true })
  } catch {
    return []
  }
  if (here.length === 0) return here
  const others = othersIn(root, base)
  if (others === null) return here
  return here.filter((one) => carried(others, join(folder, one.name)))
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

function leftOut(folder: string, name: string): boolean {
  if (UNWALKED.has(name) || name.endsWith(LOCK)) return true
  return folder === "" && name === QUARANTINE_ROOT
}

export function foldersIn(
  root: string,
  folder: string,
  base: string | null = null
): readonly string[] {
  return sittingIn(root, folder, base)
    .filter((one) => one.isDirectory() && !leftOut(folder, one.name))
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
