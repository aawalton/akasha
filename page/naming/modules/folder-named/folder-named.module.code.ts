import { basename, dirname, join } from "node:path"
import { type Parted, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const UNDER = "/"

const HERE = "."

export type Listing = (folder: string) => readonly string[]

export function openingWith(named: string, above: readonly string[]): string | null {
  for (const one of above) {
    if (named === one || named.startsWith(`${one}-`)) return one
  }
  return null
}

export function strippedOf(named: string, above: readonly string[]): string | null {
  const one = openingWith(named, above)
  if (one === null) return named
  if (named === one) return null
  return strippedOf(named.slice(one.length + 1), above)
}

const TYPED = "ts"

const DOMAIN = "domain"

const WORKSPACE = "workspace"

function pagesIn(files: readonly string[]): readonly Parted[] {
  const found: Parted[] = []
  for (const one of files) {
    const said = partedIn(one)
    if (said !== null && said.sections.length === 0 && said.held === TYPED) found.push(said)
  }
  return found
}

function namingIn(files: readonly string[]): string | null {
  const pages = pagesIn(files)
  const [one, two] = pages
  if (one === undefined || pages.length > 2) return null
  if (two === undefined) return one.slug
  if (one.pageType === DOMAIN && two.pageType === WORKSPACE) return one.slug
  if (two.pageType === DOMAIN && one.pageType === WORKSPACE) return two.slug
  return null
}

export function namesAbove(
  listed: Listing,
  folder: string,
  from: string,
  to: string
): readonly string[] {
  let at = dirname(folder)
  while (at !== "" && at !== HERE) {
    const said = at === from ? to : namingIn(listed(at))
    if (said !== null) return [said]
    at = dirname(at)
  }
  return []
}

function underFolders(paths: readonly string[], from: string): readonly string[] {
  const found = new Set<string>()
  for (const path of paths) {
    let at = dirname(path)
    while (at !== from && at !== "" && at !== HERE) {
      found.add(at)
      at = dirname(at)
    }
  }
  return [...found].sort((one, two) => one.split(UNDER).length - two.split(UNDER).length)
}

export function foldersUnder(
  listed: Listing,
  from: string,
  to: string,
  was: string,
  now: string,
  paths: readonly string[]
): ReadonlyMap<string, string> {
  const found = new Map<string, string>([[from, to]])
  for (const folder of underFolders(paths, from)) {
    const above = found.get(dirname(folder)) ?? dirname(folder)
    const named = namingIn(listed(folder))
    const before = named === null ? null : strippedOf(named, namesAbove(listed, folder, from, was))
    const after = named === null ? null : strippedOf(named, namesAbove(listed, folder, from, now))
    const takes = before === basename(folder) && after !== null ? after : basename(folder)
    found.set(folder, join(above, takes))
  }
  return found
}
