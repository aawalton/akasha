import { readFileSync } from "node:fs"
import type { Tree } from "./check-shape.ts"

export function treeOn(root: string, changed: ReadonlyMap<string, Buffer | null>): Tree {
  return {
    root,
    at: (path) => {
      const held = changed.get(path)
      if (held !== undefined) return held
      if (changed.has(path)) return null
      try {
        return readFileSync(path)
      } catch {
        return null
      }
    },
  }
}

export function onDisk(root: string): Tree {
  return treeOn(root, new Map())
}
