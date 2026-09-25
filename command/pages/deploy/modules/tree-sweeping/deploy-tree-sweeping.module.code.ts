import { readdirSync, rmSync } from "node:fs"
import { join } from "node:path"
import {
  CLUSTER_FOUNDATION,
  CLUSTER_SERVICE,
  CONTAINER_RECIPE,
  INFERENCE_SERVICE,
  TEMPER_ADDON,
  WEB_APP,
} from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import { TREE_INDEXES, TREES } from "akasha/file/modules/git-place/git-place.module.code.ts"
import { gitDirIn } from "akasha/git/modules/dir/git-dir.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

export const PINNED: ReadonlySet<string> = new Set([
  INFERENCE_SERVICE,
  CONTAINER_RECIPE,
  CLUSTER_SERVICE,
  WEB_APP,
  TEMPER_ADDON,
  CLUSTER_FOUNDATION,
])

export type Unowned = {
  readonly name: string
  readonly at: string
  readonly index: string
}

export type Took = {
  readonly took: readonly string[]
  readonly refusals: readonly string[]
}

function dirsUnder(at: string): readonly string[] {
  try {
    return readdirSync(at, { withFileTypes: true })
      .filter((one) => one.isDirectory())
      .map((one) => one.name)
      .sort()
  } catch {
    return []
  }
}

function saidOfPath(at: string, thrown: unknown): string {
  const why = thrown instanceof Error ? thrown.message : String(thrown)
  return `\`${at}\` would not go: ${why}`
}

function pinnedBy(root: string, name: string): boolean {
  if (PINNED.has(name)) return true
  return [...PINNED].some((kind) => listedAt(root, kind, name).length > 0)
}

export function foundIn(root: string): readonly Unowned[] {
  const gitDir = gitDirIn(root)
  if (gitDir === null) return []
  const trees = join(gitDir, TREES)
  return dirsUnder(trees)
    .filter((name) => !pinnedBy(root, name))
    .map((name) => ({
      name,
      at: join(trees, name),
      index: join(gitDir, TREE_INDEXES, name),
    }))
}

export function takingFrom(found: readonly Unowned[]): Took {
  const took: string[] = []
  const refusals: string[] = []
  for (const one of found) {
    const why: string[] = []
    for (const at of [one.at, one.index]) {
      try {
        rmSync(at, { recursive: true, force: true })
      } catch (thrown) {
        why.push(saidOfPath(at, thrown))
      }
    }
    if (why.length === 0) took.push(one.name)
    refusals.push(...why)
  }
  return { took, refusals }
}
