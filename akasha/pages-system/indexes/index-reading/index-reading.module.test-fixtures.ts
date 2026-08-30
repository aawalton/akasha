import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { indexIn } from "./index-reading.module.code.ts"

export function filed(root: string, at: string, lines: readonly string[]): undefined {
  const path = join(indexIn(root), at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${lines.join("\n")}\n`)
}
