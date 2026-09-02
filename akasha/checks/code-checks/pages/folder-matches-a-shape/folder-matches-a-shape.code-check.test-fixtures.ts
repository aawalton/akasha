import { heldIn } from "@akasha/pages-system/page-file-name"
import { groupedBy } from "./folder-matches-a-shape.code-check.code.ts"
import type { Standing } from "./folder-shapes/folder-shape.page-type.ts"

const FILE_PROPERTIES = new Set<string>(["code", "test"])

export type Shaping = {
  readonly folder: string
  readonly pageTypes: ReadonlySet<string>
  readonly extending?: Standing["extending"]
  readonly declaring?: Standing["declaring"]
  readonly naming?: Standing["naming"]
  readonly parts?: Standing["parts"]
  readonly holds?: Standing["holds"]
  readonly declared?: Standing["declared"]
  readonly deep?: readonly string[]
}

export function folderFrom(shaping: Shaping): (names: readonly string[]) => Standing {
  const extending = shaping.extending ?? ((): boolean => false)
  const declaring = shaping.declaring ?? ((): null => null)
  return (names: readonly string[]): Standing => {
    const held = names.map((each) =>
      heldIn(`${shaping.folder}/${each}`, shaping.pageTypes, FILE_PROPERTIES)
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
      holds: shaping.holds ?? ((): null => null),
      declared: shaping.declared ?? ((): ReadonlySet<string> => new Set<string>()),
      parts: shaping.parts ?? ((page) => [page.path]),
    }
  }
}
