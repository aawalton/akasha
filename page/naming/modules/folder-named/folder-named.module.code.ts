import { basename, dirname, join } from "node:path"
import { filesIn } from "akasha/page/index/modules/tree-reading/tree-reading.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const UNDER = "/"

const HERE = "."

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

export function namingIn(files: readonly string[]): string | null {
  for (const one of files) {
    const said = partedIn(one)
    if (said === null || said.sections.length > 0) continue
    const opening = `${said.slug}.${said.pageType}.`
    if (files.every((each) => basename(each).startsWith(opening))) return said.slug
  }
  return null
}

export function namesAbove(
  root: string,
  folder: string,
  from: string,
  to: string
): readonly string[] {
  let at = dirname(folder)
  while (at !== "" && at !== HERE) {
    const said = at === from ? to : namingIn(filesIn(root, at))
    if (said !== null) return [said]
    at = dirname(at)
  }
  return []
}

export function underFolders(paths: readonly string[], from: string): readonly string[] {
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
  root: string,
  from: string,
  to: string,
  was: string,
  now: string,
  paths: readonly string[]
): ReadonlyMap<string, string> {
  const found = new Map<string, string>([[from, to]])
  for (const folder of underFolders(paths, from)) {
    const above = found.get(dirname(folder)) ?? dirname(folder)
    const named = namingIn(filesIn(root, folder))
    const before = named === null ? null : strippedOf(named, namesAbove(root, folder, from, was))
    const after = named === null ? null : strippedOf(named, namesAbove(root, folder, from, now))
    const takes = before === basename(folder) && after !== null ? after : basename(folder)
    found.set(folder, join(above, takes))
  }
  return found
}
