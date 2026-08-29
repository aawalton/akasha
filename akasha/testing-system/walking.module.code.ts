import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

export function everyFileUnder(at: string): readonly string[] {
  const found: string[] = []
  const walk = (here: string): void => {
    for (const one of readdirSync(here, { withFileTypes: true })) {
      const next = join(here, one.name)
      if (one.isDirectory()) walk(next)
      else found.push(`${next.slice(at.length)} ${readFileSync(next, "utf8")}`)
    }
  }
  walk(at)
  return found.sort()
}
