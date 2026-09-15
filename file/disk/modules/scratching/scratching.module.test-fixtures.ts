import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { blobIdOf } from "akasha/agent/modules/read-record/read-record.module.code.ts"

export function writing(root: string, path: string, body: string): string {
  const at = join(root, path)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
  return blobIdOf(new TextEncoder().encode(body))
}

export function bodyAt(root: string, at: string | null): string {
  return at !== null && existsSync(join(root, at)) ? readFileSync(join(root, at), "utf8") : ""
}
