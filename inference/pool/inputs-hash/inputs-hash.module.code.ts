import { createHash } from "node:crypto"
import { join } from "node:path"
import { z } from "zod"

const ARRAY_BUFFER_SCHEMA = z.instanceof(ArrayBuffer)

const MAX_VALUE_IN_ERROR = 50

function truncate(said: string): string {
  return said.length <= MAX_VALUE_IN_ERROR ? said : `${said.slice(0, MAX_VALUE_IN_ERROR)}…`
}

export type InputsHash12 = string & { readonly __brand: "InputsHash12" }

const INPUTS_HASH_12_RE = /^[0-9a-f]{12}$/

export function inputsHash12(said: string): InputsHash12 {
  if (!INPUTS_HASH_12_RE.test(said)) {
    throw new Error(
      `Invalid InputsHash12: expected 12 lowercase hex chars, got "${truncate(said)}"`
    )
  }
  return said as InputsHash12
}

export function hashFiles(
  entries: ReadonlyArray<{ path: string; bytes: Uint8Array }>
): InputsHash12 {
  const sorted = [...entries].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0))
  const hash = createHash("sha256")
  for (const { path, bytes } of sorted) {
    hash.update(path)
    hash.update(bytes)
  }
  return inputsHash12(hash.digest("hex").slice(0, 12))
}

export async function computeInputsHash(args: {
  workspace: string
  graphFileSet: readonly string[]
}): Promise<InputsHash12> {
  const { workspace, graphFileSet } = args
  const entries = await Promise.all(
    graphFileSet.map(async (path) => ({
      path,
      bytes: new Uint8Array(
        ARRAY_BUFFER_SCHEMA.parse(await Bun.file(join(workspace, path)).arrayBuffer())
      ),
    }))
  )
  return hashFiles(entries)
}
