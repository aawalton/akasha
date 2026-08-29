import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

export function put(root: string, path: string, body: string): string {
  const at = join(root, path)
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, body)
  return at
}

export function stands(root: string, path: string): boolean {
  return existsSync(join(root, path))
}
