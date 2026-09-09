import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { everythingFiled } from "@akasha/indexes/testing"
import { bytesOf } from "@akasha/testing-system/bodying"
import type { FileChange } from "../../../changes/modules/answer/change-answer.module.types.ts"
import { landing } from "../landing/landing.module.code.ts"
import {
  A,
  ADMITS,
  BROKEN,
  CARRIED,
  git,
  PAGE,
  repoWith,
  rowsIn,
} from "../landing/landing.module.test-fixtures.ts"

export const MOVED_BIN = "akasha/one.bin"

export const MOVED_TO = "akasha/deep/one.bin"

export const PAGE_TO = "akasha/deep/a.domain.ts"

export const MORE = `${A}// moved\n`

export function blockedMoves(root: string): readonly FileChange[] {
  writeFileSync(join(root, "one.uncommitted.ts"), "one")
  writeFileSync(join(root, "two.uncommitted.ts"), "two")
  mkdirSync(join(root, "deep/two.uncommitted.ts"), { recursive: true })
  writeFileSync(join(root, "deep/two.uncommitted.ts/in-the-way.txt"), "in the way")
  return [
    { kind: "move", pathFrom: "one.uncommitted.ts", pathTo: "deep/one.uncommitted.ts" },
    { kind: "move", pathFrom: "two.uncommitted.ts", pathTo: "deep/two.uncommitted.ts" },
  ]
}

export type Moved = {
  readonly tree: readonly string[]
  readonly dirty: string
  readonly wrote: readonly string[]
  readonly took: readonly string[]
  readonly filed: readonly string[]
  readonly bytes: Uint8Array | null
  readonly body: string | null
}

export async function moved(from: string, to: string, body: string | null = null): Promise<Moved> {
  const root = repoWith({ [MOVED_BIN]: BROKEN })
  const first = await landing(root, rowsIn(root, CARRIED), "held", ADMITS)
  if ("refusals" in first) throw new Error(first.refusals.join("; "))
  const filed = await landing(
    root,
    rowsIn(root, [{ path: PAGE, body: bytesOf(A) }]),
    "held",
    ADMITS
  )
  if ("refusals" in filed) throw new Error(filed.refusals.join("; "))
  const edits = body === null ? [] : [{ path: to, body: bytesOf(body) }]
  const said = await landing(
    root,
    [{ kind: "move", pathFrom: from, pathTo: to }, ...rowsIn(root, edits)],
    "moved",
    ADMITS
  )
  if ("refusals" in said) throw new Error(said.refusals.join("; "))
  const at = join(root, to)
  const there = existsSync(at)
  return {
    tree: git(root, ["ls-tree", "-r", "--name-only", "HEAD"]).trim().split("\n"),
    dirty: git(root, ["status", "--porcelain"]),
    wrote: said.wrote,
    took: said.took,
    filed: everythingFiled(root).filter((one) => one.includes("a.domain.ts")),
    bytes: there ? new Uint8Array(readFileSync(at)) : null,
    body: there ? readFileSync(at, "utf8") : null,
  }
}
