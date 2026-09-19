import { basename } from "node:path"
import type { Wanted } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { folderOf } from "akasha/code/path/modules/between/code-path-between.module.code.ts"
import { strippedOf } from "akasha/page/naming/modules/folder-named/folder-named.module.code.ts"

export type Holding = {
  readonly names: readonly string[]
  readonly holds: readonly string[]
  readonly paths: readonly string[]
  readonly declared: ReadonlySet<string>
}

export type Holds = (folder: string) => Holding

const ROOT = ""

export function heldFolder(at: string, holds: Holds, held: ReadonlySet<string>): boolean {
  const named = basename(at)
  return held.has(named) && !holds(at).names.includes(named)
}

export function namingFolderOf(folder: string, holds: Holds, held: ReadonlySet<string>): string {
  let at = folderOf(folder)
  while (at !== "" && heldFolder(at, holds, held)) at = folderOf(at)
  return at
}

export function namedUnder(
  folder: string,
  gives: string,
  holds: Holds,
  held: ReadonlySet<string>
): string | null {
  return strippedOf(gives, holds(namingFolderOf(folder, holds, held)).names)
}

export function namingOver(
  holds: Holds,
  held: ReadonlySet<string>
): (folder: string) => Wanted | null {
  return (folder) => {
    if (folder === ROOT) return null
    const gives = holds(folder).names[0]
    if (gives === undefined) return null
    const name = namedUnder(folder, gives, holds, held)
    return name === null ? { name: null, gives } : { name }
  }
}
