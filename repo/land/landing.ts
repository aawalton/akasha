import { existsSync, readFileSync } from "node:fs"

const PAGE_FILE = /\.[a-z0-9-]+\.md$/

export type Bodies = ReadonlyMap<string, string | null>

export function pageFile(relPath: string): boolean {
  return PAGE_FILE.test(relPath)
}

export function bodiesBefore(root: string, relPaths: readonly string[]): Bodies {
  const held = new Map<string, string | null>()
  for (const relPath of relPaths) {
    if (!pageFile(relPath)) continue
    const absolute = `${root}/${relPath}`
    if (!existsSync(absolute)) {
      held.set(relPath, null)
      continue
    }
    try {
      held.set(relPath, readFileSync(absolute, "utf8"))
    } catch {
      held.set(relPath, null)
    }
  }
  return held
}
