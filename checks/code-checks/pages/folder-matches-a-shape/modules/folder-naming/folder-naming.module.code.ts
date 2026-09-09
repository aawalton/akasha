import { basename } from "node:path"
import type { Wanted } from "../../folder-shapes/folder-shape.page-type.ts"
import { folderOf, type Grouped } from "../folder-grouping/folder-grouping.module.code.ts"

export type Holding = {
  readonly names: readonly string[]
  readonly holds: readonly string[]
  readonly declared: ReadonlySet<string>
}

export type Holds = (folder: string) => Holding

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

export function heldFolder(at: string, holds: Holds, held: ReadonlySet<string>): boolean {
  const named = basename(at)
  return held.has(named) && !holds(at).names.includes(named)
}

export function namingFolderOf(folder: string, holds: Holds, held: ReadonlySet<string>): string {
  let at = folderOf(folder)
  while (at !== "" && heldFolder(at, holds, held)) at = folderOf(at)
  return at
}

export function answeringTo(
  folder: string,
  grouped: Grouped,
  holds: Holds,
  held: ReadonlySet<string>
): readonly string[] {
  const found: string[] = []
  const asked: string[] = [folder]
  while (asked.length > 0) {
    const at = asked.pop()
    if (at === undefined) break
    for (const one of grouped.foldersIn(at)) {
      found.push(one)
      if (heldFolder(one, holds, held)) asked.push(one)
    }
  }
  return found
}

export function namingOver(
  holds: Holds,
  held: ReadonlySet<string>
): (folder: string) => Wanted | null {
  return (folder) => {
    const names = holds(folder).names
    const gives = names[1] ?? names[0]
    if (gives === undefined) return null
    const name = strippedOf(gives, holds(namingFolderOf(folder, holds, held)).names)
    return name === null ? { name: null, gives } : { name }
  }
}
