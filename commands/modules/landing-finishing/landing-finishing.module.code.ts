import {
  type Drawing,
  editorStateLanded,
  NOTHING_DRAWN,
} from "akasha/command/modules/editor-state-landing/editor-state-landing.module.code.ts"
import { clearedOff } from "akasha/command/modules/folder-clearing/folder-clearing.module.code.ts"
import {
  type Linking,
  linkedOver,
  NOTHING_LINKED,
} from "akasha/command/modules/folder-linking/folder-linking.module.code.ts"
import { linkedInPlace } from "akasha/command/modules/install-linking/install-linking.module.code.ts"
import type { FileMove } from "akasha/command/modules/path-moving/path-moving.module.code.ts"
import { unitsLanded } from "akasha/command/modules/unit-landing/unit-landing.module.code.ts"

export type Finished = {
  readonly cleared: readonly string[]
  readonly linked: Linking
  readonly placed: Linking
  readonly units: Linking
  readonly drawn: Linking
}

export const NOTHING_FINISHED: Finished = {
  cleared: [],
  linked: NOTHING_LINKED,
  placed: NOTHING_LINKED,
  units: NOTHING_LINKED,
  drawn: NOTHING_LINKED,
}

export function finishedOver(
  root: string,
  gone: readonly string[],
  moves: readonly FileMove[],
  home: string,
  drawing: Drawing = NOTHING_DRAWN
): Finished {
  const cleared = clearedOff(root, gone)
  const linked = linkedOver(root, moves, home)
  const placed = linkedInPlace(root, home)
  const units = unitsLanded(root, home)
  const drawn = editorStateLanded(root, drawing)
  return { cleared, linked, placed, units, drawn }
}
