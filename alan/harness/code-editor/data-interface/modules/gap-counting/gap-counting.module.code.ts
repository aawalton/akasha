import { gapsIn } from "akasha/alan/harness/code-editor/data-interface/modules/gap-tree-assemble/gap-tree-assemble.module.code.ts"
import {
  readState,
  stateAt,
} from "akasha/alan/harness/code-editor/data-interface/modules/state-reading/state-reading.module.code.ts"
import { gapTreeStateSchema } from "akasha/alan/harness/code-editor/data-interface/pages/gap-tree/gap-tree.code-editor-data-interface.code.ts"

const GAP_TREE = "gap-tree"

export function gapPictureAt(root: string): string {
  return stateAt(root, GAP_TREE)
}

export function gapCountIn(root: string): number {
  const drawn = readState(gapPictureAt(root), gapTreeStateSchema)
  if (drawn === null) return gapsIn(root).length
  return drawn.roots.reduce((total, one) => total + one.gaps, 0)
}
