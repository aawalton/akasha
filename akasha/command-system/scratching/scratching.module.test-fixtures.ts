import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { blobIdOf } from "../reading/reading.module.code.ts"

export function standing(root: string, path: string, body: string): string {
  const at = join(root, path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
  return blobIdOf(new TextEncoder().encode(body))
}
