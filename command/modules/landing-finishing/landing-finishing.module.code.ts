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
}

export const NOTHING_FINISHED: Finished = {
  cleared: [],
  linked: NOTHING_LINKED,
  placed: NOTHING_LINKED,
  units: NOTHING_LINKED,
}

export function finishedOver(
  root: string,
  cleared: readonly string[],
  moves: readonly FileMove[],
  home: string
): Finished {
  const linked = linkedOver(root, moves, home)
  const placed = linkedInPlace(root, home)
  const units = unitsLanded(root, home)
  return { cleared, linked, placed, units }
}
