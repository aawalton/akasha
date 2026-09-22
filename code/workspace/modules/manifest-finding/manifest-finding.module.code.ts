import { dirname, join } from "node:path"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"

const WORKSPACE = "workspace"

const WORKSPACE_MANIFEST = "workspace-manifest"

const HERE = "."

const ROOT = ""

const NO_MANIFEST = `the index names no file for \`${WORKSPACE_MANIFEST}\`, so no manifest is findable`

export type Manifest = {
  readonly folder: string
  readonly at: string
}

type Indexed = {
  readonly index: Answering
}

export function manifestNamed(indexed: Indexed): string {
  const said = indexed.index.fileKeysAt().get(WORKSPACE_MANIFEST)
  if (said === undefined || said === null) throw new Error(NO_MANIFEST)
  return said
}

export function pagesOfKind(indexed: Indexed, kind: string): readonly string[] {
  const found = new Set(indexed.index.everyOfType(kind).map((one) => one.path))
  for (const under of indexed.index.kindsUnder(kind)) {
    if (under === kind) continue
    for (const one of indexed.index.everyOfType(under)) found.add(one.path)
  }
  return [...found].sort()
}

export function folderOf(path: string): string {
  const folder = dirname(path)
  return folder === HERE ? ROOT : folder
}

function manifestsAt(pages: readonly string[], manifest: string | null): readonly Manifest[] {
  if (manifest === null) return []
  return pages.map((path) => {
    const folder = folderOf(path)
    return { folder, at: join(folder, manifest) }
  })
}

export function manifestsIn(indexed: Indexed): readonly Manifest[] {
  const workspaces = pagesOfKind(indexed, WORKSPACE)
  return manifestsAt(workspaces, indexed.index.fileKeysAt().get(WORKSPACE_MANIFEST) ?? null)
}
