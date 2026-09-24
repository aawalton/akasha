import { folderOf } from "akasha/code/path/modules/between/code-path-between.module.code.ts"
import { uncommittedHeld } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

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

export type Listing = Pick<Shadow, "listed">

const nothingGenerated = (): boolean => false

function openedIn(every: readonly string[]): ReadonlyMap<string, ReadonlySet<string>> {
  const opened = new Map<string, Set<string>>()
  for (const one of every) {
    if (uncommittedHeld(one)) continue
    for (const at of ancestorsOf(one)) {
      const above = folderOf(at)
      const kept = opened.get(above)
      if (kept === undefined) opened.set(above, new Set<string>([at]))
      else kept.add(at)
    }
  }
  return opened
}

export function groupedOver(
  listing: Listing,
  generated: (path: string) => boolean = nothingGenerated
): Grouped {
  let opened: ReadonlyMap<string, ReadonlySet<string>> | null = null
  const files = new Map<string, readonly string[]>()
  const folders = new Map<string, readonly string[]>()
  const grouped: Grouped = {
    at: (folder) => {
      const found = files.get(folder)
      if (found !== undefined) return found
      const made = listing.listed(folder).filter((one) => !generated(one))
      files.set(folder, made)
      return made
    },
    foldersIn: (folder) => {
      const found = folders.get(folder)
      if (found !== undefined) return found
      if (opened === null) opened = openedIn(listing.listed())
      const held = [...(opened.get(folder) ?? [])].sort()
      const made = held.filter((one) => !holdsNothing(grouped, one))
      folders.set(folder, made)
      return made
    },
  }
  return grouped
}

export function listingOf(paths: readonly string[]): Listing {
  let under: Map<string, string[]> | null = null
  const sitting = (): Map<string, string[]> => {
    if (under !== null) return under
    const made = new Map<string, string[]>()
    for (const one of paths) {
      const at = folderOf(one)
      const kept = made.get(at)
      if (kept === undefined) made.set(at, [one])
      else kept.push(one)
    }
    for (const kept of made.values()) kept.sort()
    under = made
    return made
  }
  return { listed: (folder) => (folder === undefined ? paths : (sitting().get(folder) ?? [])) }
}

export function holdsNothing(grouped: Grouped, folder: string): boolean {
  return grouped.at(folder).length === 0 && grouped.foldersIn(folder).length === 0
}

export function wantedOver(
  grouped: Grouped,
  wanted: (path: string) => boolean
): (folder: string) => readonly string[] {
  const held = new Map<string, readonly string[]>()
  return (folder) => {
    const found = held.get(folder)
    if (found !== undefined) return found
    const made = grouped.at(folder).filter(wanted)
    held.set(folder, made)
    return made
  }
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
