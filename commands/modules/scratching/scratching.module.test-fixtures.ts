import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { blobIdOf } from "../reading/reading.module.code.ts"

export function writing(root: string, path: string, body: string): string {
  const at = join(root, path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
  return blobIdOf(new TextEncoder().encode(body))
}

export function manifest(name: string): string {
  return `${JSON.stringify({ name, private: true }, null, 2)}\n`
}
