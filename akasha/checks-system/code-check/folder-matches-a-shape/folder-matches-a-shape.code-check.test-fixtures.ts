import { heldIn } from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import type { Standing } from "./folder-shape/folder-shape.page-type.ts"

const FILE_PROPERTIES = new Set<string>(["code", "test"])

export type Shaping = {
  readonly folder: string
  readonly pageTypes: ReadonlySet<string>
  readonly extending?: Standing["extending"]
}

export function standingIn(shaping: Shaping): (names: readonly string[]) => Standing {
  const extending = shaping.extending ?? ((): boolean => false)
  return (names: readonly string[]): Standing => {
    const held = names.map((each) =>
      heldIn(`${shaping.folder}/${each}`, shaping.pageTypes, FILE_PROPERTIES)
    )
    return {
      folder: shaping.folder,
      files: held.map((each) => each.path),
      deep: [],
      pages: held.filter((each) => each.kind === "page"),
      properties: held.filter((each) => each.kind === "property"),
      strays: held.filter((each) => each.kind === "stray"),
      entered: () => false,
      extending,
    }
  }
}
