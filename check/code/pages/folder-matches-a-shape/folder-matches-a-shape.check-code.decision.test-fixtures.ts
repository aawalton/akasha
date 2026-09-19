import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { HOLDS as HELD_BY_MODULES_ONLY } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/modules-only/modules-only.folder-shape.code.ts"
import { HOLDS as HELD_BY_PAGES_OF_THE_TYPE_ABOVE } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/pages-of-the-type-above/pages-of-the-type-above.folder-shape.code.ts"

import {
  type Grouped,
  segmentingOver,
} from "akasha/check/code/pages/folder-matches-a-shape/modules/folder-grouping/folder-grouping.module.code.ts"
import type { Holds } from "akasha/check/code/pages/folder-matches-a-shape/modules/folder-naming/folder-naming.module.code.ts"
import { folderOf } from "akasha/code/path/modules/between/code-path-between.module.code.ts"
import { heldIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

export const MANIFEST_AT = "akasha/one/manifests/one-manifests.manifest.ts"

export const GENERATED_AT = "akasha/one/manifests/generated"

export const MY_MATH_AT = "alan/book/my-math/sections/beginnings.book-section.ts"

export function holding(named: Readonly<Record<string, readonly string[]>>): Holds {
  return (folder) => ({
    names: named[folder] ?? [],
    holds: [],
    paths: [],
    declared: new Set<string>(),
  })
}

export function grouping(under: Readonly<Record<string, readonly string[]>>): Grouped {
  return {
    at: () => [],
    foldersIn: (folder) => under[folder] ?? [],
  }
}

export function holdsAt(at: string): readonly string[] {
  if (at.endsWith("/families")) return ["page-type/model-humming"]
  if (at.endsWith("/stray")) return ["domain/other"]
  return []
}

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
  readonly pathsHeld?: Standing["pathsHeld"]
  readonly declared?: Standing["declared"]
  readonly gathered?: Standing["gathered"]
  readonly partOf?: Standing["partOf"]
  readonly addressing?: Standing["addressing"]
  readonly claimed?: Standing["claimed"]
  readonly held?: ReadonlySet<string>
  readonly deep?: readonly string[]
  readonly above?: readonly string[]
}

const GATHERED_IN_TESTS = [
  "modules",
  "pages",
  "properties",
  "scripts",
  "sections",
  "service-workstations",
  "test-fixtures",
]

const HELD_IN_TESTS = new Set<string>([
  ...GATHERED_IN_TESTS,
  ...HELD_BY_MODULES_ONLY,
  ...HELD_BY_PAGES_OF_THE_TYPE_ABOVE,
])

export const sameName: Standing["extending"] = (pageTypeSlug, wanted) => pageTypeSlug === wanted

export function holdsFrom(named: Readonly<Record<string, readonly string[]>>): Standing["holds"] {
  return (at) => named[at] ?? []
}

export function gatheringFrom(
  named: Readonly<Record<string, readonly string[]>>
): Standing["gathered"] {
  return (plural) => named[plural] ?? []
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
    const above = (shaping.above ?? []).map((each) => `${folderOf(shaping.folder)}/${each}`)
    const grouped = groupedBy([...files, ...deep, ...above])
    return {
      folder: shaping.folder,
      files,
      pages: held.filter((each) => each.kind === "page"),
      properties: held.filter((each) => each.kind === "property"),
      strays: held.filter((each) => each.kind === "stray"),
      extending,
      subfolders: grouped.foldersIn(shaping.folder),
      held: shaping.held ?? HELD_IN_TESTS,
      under: (at) => grouped.at(at),
      declaring,
      naming: shaping.naming ?? ((): null => null),
      holds: shaping.holds ?? ((): readonly string[] => []),
      pathsHeld: shaping.pathsHeld ?? ((): readonly string[] => []),
      declared: shaping.declared ?? ((): ReadonlySet<string> => new Set<string>()),
      gathered: shaping.gathered ?? ((): readonly string[] => []),
      parts: shaping.parts ?? ((page) => [page.path]),
      partOf: shaping.partOf ?? ((): readonly string[] => []),
      addressing: shaping.addressing ?? ((): readonly string[] => []),
      claimed: shaping.claimed ?? ((): boolean => false),
    }
  }
}

const DECLARING = new Map([["dockerfile-extensions", "deploy/dockerfile-extensions.json"]])

const LATER = new Map(DECLARING).set("site-icon", "public/favicon.svg")

const DEPLOYING = groupedBy([
  "one/deploy/dockerfile-extensions.json",
  "two/deploy/other.ts",
  "three/public/favicon.svg",
  "four/deploy/dockerfile-extensions.json",
  "four/deploy/nested/held.ts",
])

export const segmented = segmentingOver(DECLARING, DEPLOYING)

export const segmentedLater = segmentingOver(LATER, DEPLOYING)
