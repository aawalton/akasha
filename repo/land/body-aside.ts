import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { type Landing, patchText } from "../../patches/patch.ts"

const SCRATCH = "/var/tmp"

export interface Bodied {
  readonly relPath: string
  readonly body: string | Uint8Array
}

function bodyAside(body: string | Uint8Array): string {
  const at = `${mkdtempSync(`${SCRATCH}/landing-body-`)}/body`
  writeFileSync(at, body)
  return at
}

export function patchAside(
  bodied: readonly Bodied[],
  carried: readonly Landing[],
  removals: readonly string[],
  root?: string
): string {
  const aside = bodied.map((one) => ({ relPath: one.relPath, from: bodyAside(one.body) }))
  try {
    return patchText([...aside, ...carried], removals, root)
  } finally {
    for (const one of aside) rmSync(dirname(one.from), { recursive: true, force: true })
  }
}
