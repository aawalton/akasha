import {
  editsRepointed,
  type Landed,
} from "akasha/command/modules/edits-repointing/edits-repointing.module.code.ts"
import {
  type Linking,
  linkedOver,
  NOTHING_LINKED,
} from "akasha/command/modules/folder-linking/folder-linking.module.code.ts"
import {
  linkedInPlace,
  ranElsewhere,
} from "akasha/command/modules/install-linking/install-linking.module.code.ts"
import type { FileMove } from "akasha/command/modules/path-moving/path-moving.module.code.ts"

export type Finished = {
  readonly cleared: readonly string[]
  readonly linked: Linking
  readonly placed: Linking
}

export const NOTHING_FINISHED: Finished = {
  cleared: [],
  linked: NOTHING_LINKED,
  placed: NOTHING_LINKED,
}

export function finishedOver(
  root: string,
  cleared: readonly string[],
  moves: readonly FileMove[],
  home: string,
  landed: Landed | null = null
): Finished {
  for (const one of editsRepointed(root, moves, landed)) process.stderr.write(`${one}\n`)
  const elsewhere = ranElsewhere(root, home)
  if (elsewhere !== null) {
    return { cleared, linked: NOTHING_LINKED, placed: { said: [elsewhere], wrong: [] } }
  }
  const linked = linkedOver(root, moves, home)
  const placed = linkedInPlace(root, home)
  return { cleared, linked, placed }
}
