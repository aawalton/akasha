import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

export function packageAt(root: string, rel: string): undefined {
  mkdirSync(join(root, rel), { recursive: true })
  writeFileSync(join(root, rel, "package.json"), "{}")
  return undefined
}
