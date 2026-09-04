import { existsSync, readlinkSync, realpathSync } from "node:fs"
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "node:path"

const STEPS = 64

const UP = `..${sep}`

function linkAt(at: string): string | null {
  try {
    return readlinkSync(at)
  } catch {
    return null
  }
}

export function settled(path: string): string {
  let at = resolve(path)
  const left: string[] = []
  for (let step = 0; step < STEPS; step += 1) {
    const link = linkAt(at)
    if (link !== null) {
      at = resolve(dirname(at), link)
      continue
    }
    if (existsSync(at)) return join(realpathSync(at), ...left)
    const up = dirname(at)
    if (up === at) break
    left.unshift(basename(at))
    at = up
  }
  return join(at, ...left)
}

export function insideOf(root: string, at: string): boolean {
  const said = relative(root, at)
  if (said === "") return true
  if (isAbsolute(said)) return false
  return said !== ".." && !said.startsWith(UP)
}
