import { existsSync, readdirSync, rmdirSync } from "node:fs"
import { dirname, join } from "node:path"

const PARTED_BY = "/"

export function emptiedBy(gone: readonly string[]): readonly string[] {
  const dirs = new Set<string>()
  for (const path of gone) {
    let dir = dirname(path)
    while (dir.includes(PARTED_BY)) {
      dirs.add(dir)
      dir = dirname(dir)
    }
  }
  return [...dirs].sort((one, two) => two.split(PARTED_BY).length - one.split(PARTED_BY).length)
}

export function wouldClear(root: string, gone: readonly string[]): readonly string[] {
  const taken = new Set(gone)
  const emptied = new Set<string>()
  const said: string[] = []
  for (const dir of emptiedBy(gone)) {
    const at = join(root, dir)
    try {
      if (!existsSync(at)) continue
      const left = readdirSync(at).filter((name) => {
        const path = `${dir}${PARTED_BY}${name}`
        return !taken.has(path) && !emptied.has(path)
      })
      if (left.length > 0) continue
    } catch {
      continue
    }
    emptied.add(dir)
    said.push(dir)
  }
  return said
}

export function clearedOff(root: string, gone: readonly string[]): readonly string[] {
  const said: string[] = []
  for (const dir of wouldClear(root, gone)) {
    try {
      rmdirSync(join(root, dir))
    } catch {
      continue
    }
    said.push(dir)
  }
  return said
}
