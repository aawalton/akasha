import { existsSync } from "node:fs"
import { dirname, join } from "node:path"

const MARK = "node_modules"

export function rootAbove(from: string): string | null {
  let at = from
  for (;;) {
    if (existsSync(join(at, MARK))) return at
    const up = dirname(at)
    if (up === at) return null
    at = up
  }
}
