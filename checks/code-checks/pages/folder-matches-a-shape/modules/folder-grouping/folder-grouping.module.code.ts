import type { Answering } from "@akasha/indexes/answering"
import type { Change } from "@akasha/pages/change"

export function folderOf(path: string): string {
  const cut = path.lastIndexOf("/")
  return cut === -1 ? "" : path.slice(0, cut)
}

export function ancestorsOf(path: string): readonly string[] {
  const found: string[] = []
  let at = folderOf(path)
  while (at !== "") {
    found.push(at)
    at = folderOf(at)
  }
  return found
}

export function reachedFolders(target: string, importer: string): readonly string[] {
  const found: string[] = []
  let at = folderOf(target)
  while (at !== "" && !importer.startsWith(`${at}/`)) {
    found.push(at)
    at = folderOf(at)
  }
  return found
}

export type Grouped = {
  readonly at: (folder: string) => readonly string[]
  readonly foldersIn: (folder: string) => readonly string[]
}

export function groupedOver(index: Answering, change: Change): Grouped {
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
    for (const at of ancestorsOf(one)) into(opened, folderOf(at), at)
  }
  const files = new Map<string, readonly string[]>()
  const folders = new Map<string, readonly string[]>()
  return {
    at: (folder) => {
      const found = files.get(folder)
      if (found !== undefined) return found
      const held = new Set<string>(index.filesIn(folder))
      for (const one of added.get(folder) ?? []) held.add(one)
      for (const one of gone.get(folder) ?? []) held.delete(one)
      const made = [...held].sort()
      files.set(folder, made)
      return made
    },
    foldersIn: (folder) => {
      const found = folders.get(folder)
      if (found !== undefined) return found
      const held = new Set<string>(index.foldersIn(folder))
      for (const one of opened.get(folder) ?? []) held.add(one)
      const made = [...held].sort()
      folders.set(folder, made)
      return made
    },
  }
}

export function segmentingOver(
  declaring: ReadonlyMap<string, string | null>,
  grouped: Grouped
): (folder: string) => boolean {
  const segments: (readonly [string, string])[] = []
  for (const fileName of declaring.values()) {
    const named = fileName === null ? [] : fileName.split("/")
    for (let at = 1; at < named.length; at += 1) {
      segments.push([named.slice(0, at).join("/"), named.slice(at).join("/")])
    }
  }
  return (folder) =>
    segments.some(([under, rest]) => {
      if (folder !== under && !folder.endsWith(`/${under}`)) return false
      const path = `${folder}/${rest}`
      return grouped.at(folderOf(path)).includes(path)
    })
}
