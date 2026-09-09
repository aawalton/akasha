import { heldIn } from "@akasha/pages/page-file-name"
import type { Standing } from "./folder-shapes/folder-shape.page-type.ts"
import {
  folderOf,
  type Grouped,
  segmentingOver,
} from "./modules/folder-grouping/folder-grouping.module.code.ts"

function groupedBy(files: readonly string[]): Grouped {
  const sitting = new Map<string, string[]>()
  const beneath = new Map<string, Set<string>>()
  for (const one of files) {
    const folder = folderOf(one)
    const held = sitting.get(folder)
    if (held === undefined) sitting.set(folder, [one])
    else held.push(one)
    let here = folder
    while (here !== "") {
      const above = folderOf(here)
      const kept = beneath.get(above)
      if (kept === undefined) beneath.set(above, new Set<string>([here]))
      else kept.add(here)
      here = above
    }
  }
  const sorted = new Map<string, readonly string[]>()
  return {
    at: (folder) => sitting.get(folder) ?? [],
    foldersIn: (folder) => {
      const found = sorted.get(folder)
      if (found !== undefined) return found
      const made = [...(beneath.get(folder) ?? [])].sort()
      sorted.set(folder, made)
      return made
    },
  }
}

const FILE_PROPERTIES = new Set<string>(["code", "test"])

export type Shaping = {
  readonly folder: string
  readonly pageTypes: ReadonlySet<string>
  readonly fileProperties?: ReadonlySet<string>
  readonly extending?: Standing["extending"]
  readonly declaring?: Standing["declaring"]
  readonly naming?: Standing["naming"]
  readonly parts?: Standing["parts"]
  readonly holds?: Standing["holds"]
  readonly declared?: Standing["declared"]
  readonly partOf?: Standing["partOf"]
  readonly deep?: readonly string[]
}

export function folderFrom(shaping: Shaping): (names: readonly string[]) => Standing {
  const extending = shaping.extending ?? ((): boolean => false)
  const declaring = shaping.declaring ?? ((): null => null)
  return (names: readonly string[]): Standing => {
    const held = names.map((each) =>
      heldIn(
        `${shaping.folder}/${each}`,
        shaping.pageTypes,
        shaping.fileProperties ?? FILE_PROPERTIES
      )
    )
    const files = held.map((each) => each.path)
    const deep = (shaping.deep ?? []).map((each) => `${shaping.folder}/${each}`)
    const grouped = groupedBy([...files, ...deep])
    return {
      folder: shaping.folder,
      files,
      pages: held.filter((each) => each.kind === "page"),
      properties: held.filter((each) => each.kind === "property"),
      strays: held.filter((each) => each.kind === "stray"),
      entered: () => false,
      extending,
      subfolders: grouped.foldersIn(shaping.folder),
      under: (at) => grouped.at(at),
      declaring,
      naming: shaping.naming ?? ((): null => null),
      holds: shaping.holds ?? ((): readonly string[] => []),
      declared: shaping.declared ?? ((): ReadonlySet<string> => new Set<string>()),
      parts: shaping.parts ?? ((page) => [page.path]),
      partOf: shaping.partOf ?? ((): readonly string[] => []),
    }
  }
}

const DECLARING = new Map([["dockerfile-extensions", "deploy/dockerfile-extensions.json"]])

const LATER = new Map(DECLARING).set("site-icon", "public/favicon.svg")

const DEPLOYING = groupedBy([
  "one/deploy/dockerfile-extensions.json",
  "two/deploy/other.ts",
  "three/public/favicon.svg",
])

export const segmented = segmentingOver(DECLARING, DEPLOYING)

export const segmentedLater = segmentingOver(LATER, DEPLOYING)
