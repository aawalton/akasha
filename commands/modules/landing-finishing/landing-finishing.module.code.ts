import { clearedOff } from "akasha/commands/modules/folder-clearing/folder-clearing.module.code.ts"
import {
  type Linking,
  linkedOver,
  NOTHING_LINKED,
} from "akasha/commands/modules/folder-linking/folder-linking.module.code.ts"
import { linkedInPlace } from "akasha/commands/modules/install-linking/install-linking.module.code.ts"
import type { FileMove } from "akasha/commands/modules/path-moving/path-moving.module.code.ts"
import { unitsLanded } from "akasha/commands/modules/unit-landing/unit-landing.module.code.ts"

export type Finished = {
  readonly cleared: readonly string[]
  readonly linked: Linking
  readonly placed: Linking
  readonly units: Linking
}

export const NOTHING_FINISHED: Finished = {
  cleared: [],
  linked: NOTHING_LINKED,
  placed: NOTHING_LINKED,
  units: NOTHING_LINKED,
}

export function finishedOver(
  root: string,
  gone: readonly string[],
  moves: readonly FileMove[],
  home: string
): Finished {
  const cleared = clearedOff(root, gone)
  const linked = linkedOver(root, moves, home)
  const placed = linkedInPlace(root, home)
  const units = unitsLanded(root, home)
  return { cleared, linked, placed, units }
}
