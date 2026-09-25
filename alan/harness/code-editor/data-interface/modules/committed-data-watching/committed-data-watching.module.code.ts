import { readFileSync, statSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { akashaRoot } from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import {
  type Picture,
  watchPictures,
} from "akasha/alan/harness/code-editor/data-interface/modules/data-watching/data-watching.module.code.ts"
import { refusalTreeLine } from "akasha/alan/harness/code-editor/data-interface/modules/refusal-tree-drawing/refusal-tree-drawing.module.code.ts"
import { NOTHING_WRITTEN } from "akasha/alan/harness/code-editor/data-interface/modules/state-cooldown/state-cooldown.module.code.ts"

const DOT_GIT = ".git"

const GIT_DIR_MARK = "gitdir: "

const COMMON_DIR = "commondir"

const HEAD = "HEAD"

const REF_MARK = "ref: "

const PACKED_REFS = "packed-refs"

export type Branch = {
  readonly ref: string
  readonly packed: string
}

function textAt(at: string): string | null {
  try {
    return readFileSync(at, "utf8").trim()
  } catch {
    return null
  }
}

function gitDirOf(root: string): string {
  const at = join(root, DOT_GIT)
  if (statSync(at).isDirectory()) return at
  const said = textAt(at) ?? ""
  if (!said.startsWith(GIT_DIR_MARK)) throw new Error(`${at} names no git folder`)
  return resolve(root, said.slice(GIT_DIR_MARK.length))
}

export function branchOf(root: string): Branch {
  const gitDir = gitDirOf(root)
  const common = textAt(join(gitDir, COMMON_DIR))
  const commonDir = common === null ? gitDir : resolve(gitDir, common)
  const head = textAt(join(gitDir, HEAD)) ?? ""
  if (!head.startsWith(REF_MARK)) throw new Error(`${root} is on no branch, so no commit moves it`)
  return {
    ref: join(commonDir, head.slice(REF_MARK.length)),
    packed: join(commonDir, PACKED_REFS),
  }
}

export function committedPicturesOf(root: string): ReadonlyMap<string, Picture> {
  const branch = branchOf(root)
  const moved = (at: string): boolean => at === branch.ref || at === branch.packed
  const folders = [...new Set([dirname(branch.ref), dirname(branch.packed)])].sort()
  return new Map<string, Picture>([
    [
      "refusal-tree",
      {
        cooldownMs: 1_000,
        folders,
        reaches: [],
        holds: moved,
        identities: [],
        line: () => refusalTreeLine(root),
        held: NOTHING_WRITTEN,
        waking: null,
      },
    ],
  ])
}

export function watchCommittedData(): () => undefined {
  const root = akashaRoot()
  return watchPictures(root, committedPicturesOf(root))
}

if (import.meta.main) {
  watchCommittedData()
}
