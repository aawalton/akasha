import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { gitIgnoring } from "akasha/git/modules/pathspec/git-pathspec.module.code.ts"

type Taking = {
  readonly path: string
  readonly body: Uint8Array | null
}

function fileOn(root: string, path: string): Uint8Array | null {
  const at = join(root, path)
  try {
    return statSync(at).isFile() ? readFileSync(at) : null
  } catch {
    return null
  }
}

export function unheldAt(root: string, path: string): Uint8Array | null {
  const body = fileOn(root, path)
  if (body === null) return null
  const ignored = gitIgnoring(root, [path])
  return ignored === null || ignored.has(path) ? null : body
}

export function takenUnheld(
  root: string,
  before: Map<string, Uint8Array | null>,
  edits: readonly Taking[]
): Map<string, Uint8Array | null> {
  for (const one of edits) {
    if (one.body !== null || before.get(one.path) !== null) continue
    before.set(one.path, unheldAt(root, one.path))
  }
  return before
}
