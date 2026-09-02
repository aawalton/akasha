import { existsSync, readdirSync } from "node:fs"
import { basename, dirname, join } from "node:path"

const TS = ".ts"

const BESIDE = /^[a-z0-9-]+\.[a-z0-9]+$/

export function besideOf(root: string, path: string): readonly string[] {
  if (!path.endsWith(TS)) return []
  const stem = basename(path).slice(0, -TS.length)
  const dir = dirname(path)
  const full = join(root, dir)
  if (!existsSync(full)) return []
  const found: string[] = []
  for (const name of readdirSync(full)) {
    if (!name.startsWith(`${stem}.`)) continue
    if (!BESIDE.test(name.slice(stem.length + 1))) continue
    found.push(join(dir, name))
  }
  return found.sort()
}

export function besideAll(root: string, paths: readonly string[]): readonly string[] {
  const named = new Set(paths)
  const found = new Set<string>()
  for (const one of paths) {
    for (const held of besideOf(root, one)) {
      if (!named.has(held)) found.add(held)
    }
  }
  return [...found].sort()
}
