import { folderOf } from "akasha/code/path/modules/between/code-path-between.module.code.ts"
import {
  filesIn,
  foldersIn,
} from "akasha/page/index/modules/tree-reading/tree-reading.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { uncommittedHeld } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

export function ancestorsOf(path: string): readonly string[] {
  const found: string[] = []
  let at = folderOf(path)
  while (at !== "") {
    found.push(at)
    at = folderOf(at)
  }
  return found
}

export type Grouped = {
  readonly at: (folder: string) => readonly string[]
  readonly foldersIn: (folder: string) => readonly string[]
}

const nothingGenerated = (): boolean => false

export function groupedOver(
  change: Change,
  generated: (path: string) => boolean = nothingGenerated
): Grouped {
  const base = change.base ?? null
  const added = new Map<string, Set<string>>()
  const gone = new Map<string, Set<string>>()
  const opened = new Map<string, Set<string>>()
  const into = (held: Map<string, Set<string>>, at: string, one: string): undefined => {
    const kept = held.get(at)
    if (kept === undefined) held.set(at, new Set<string>([one]))
    else kept.add(one)
  }
  for (const one of change.changed) {
    if (change.after(one) === null) {
      into(gone, folderOf(one), one)
      continue
    }
    into(added, folderOf(one), one)
    if (uncommittedHeld(one)) continue
    for (const at of ancestorsOf(one)) into(opened, folderOf(at), at)
  }
  const files = new Map<string, readonly string[]>()
  const folders = new Map<string, readonly string[]>()
  const grouped: Grouped = {
    at: (folder) => {
      const found = files.get(folder)
      if (found !== undefined) return found
      const held = new Set<string>(filesIn(change.root, folder, base))
      for (const one of added.get(folder) ?? []) held.add(one)
      for (const one of gone.get(folder) ?? []) held.delete(one)
      const made = [...held].sort().filter((one) => !generated(one))
      files.set(folder, made)
      return made
    },
    foldersIn: (folder) => {
      const found = folders.get(folder)
      if (found !== undefined) return found
      const held = new Set<string>(foldersIn(change.root, folder, base))
      for (const one of opened.get(folder) ?? []) held.add(one)
      const made = [...held].sort().filter((one) => !holdsNothing(grouped, one))
      folders.set(folder, made)
      return made
    },
  }
  return grouped
}

export function holdsNothing(grouped: Grouped, folder: string): boolean {
  return grouped.at(folder).length === 0 && grouped.foldersIn(folder).length === 0
}

export function segmentingOver(
  declaring: ReadonlyMap<string, string | null>,
  grouped: Grouped
): (folder: string) => boolean {
  const segments: (readonly [string, string])[] = []
  for (const fileName of declaring.values()) {
    const cut = fileName === null ? -1 : fileName.lastIndexOf("/")
    if (fileName === null || cut === -1) continue
    segments.push([fileName.slice(0, cut), fileName.slice(cut + 1)])
  }
  return (folder) => {
    if (grouped.foldersIn(folder).length > 0) return false
    const named = new Set<string>()
    for (const [under, rest] of segments) {
      if (folder === under || folder.endsWith(`/${under}`)) named.add(`${folder}/${rest}`)
    }
    const files = grouped.at(folder)
    return files.length > 0 && files.every((one) => named.has(one))
  }
}
