import { basename } from "node:path"
import type { Wanted } from "../../folder-shapes/folder-shape.page-type.ts"
import { folderOf, type Grouped } from "../folder-grouping/folder-grouping.module.code.ts"

const MODULES = "modules"

const PAGES = "pages"

const PROPERTIES = "properties"

const SCRIPTS = "scripts"

export type Holding = {
  readonly names: readonly string[]
  readonly holds: readonly string[]
  readonly declared: ReadonlySet<string>
}

export type Holds = (folder: string) => Holding

export const HELD_FOLDERS = new Set<string>([MODULES, PAGES, PROPERTIES, SCRIPTS])

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

export function heldFolder(at: string, holds: Holds): boolean {
  const named = basename(at)
  return HELD_FOLDERS.has(named) && !holds(at).names.includes(named)
}

export function namingFolderOf(folder: string, holds: Holds): string {
  let at = folderOf(folder)
  while (at !== "" && heldFolder(at, holds)) at = folderOf(at)
  return at
}

export function answeringTo(folder: string, grouped: Grouped, holds: Holds): readonly string[] {
  const found: string[] = []
  const asked: string[] = [folder]
  while (asked.length > 0) {
    const at = asked.pop()
    if (at === undefined) break
    for (const one of grouped.foldersIn(at)) {
      found.push(one)
      if (heldFolder(one, holds)) asked.push(one)
    }
  }
  return found
}

export function namingOver(holds: Holds): (folder: string) => Wanted | null {
  return (folder) => {
    const names = holds(folder).names
    const gives = names[1] ?? names[0]
    if (gives === undefined) return null
    const name = strippedOf(gives, holds(namingFolderOf(folder, holds)).names)
    return name === null ? { name: null, gives } : { name }
  }
}
