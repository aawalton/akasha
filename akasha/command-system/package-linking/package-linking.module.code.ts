import {
  existsSync,
  lstatSync,
  mkdirSync,
  readlinkSync,
  rmdirSync,
  rmSync,
  symlinkSync,
} from "node:fs"
import { dirname, join } from "node:path"

const PARTED_BY = "/"

const MODULES = "node_modules"

const UP = "../"

const MANIFEST = "package.json"

export type Linking = {
  readonly name: string
  readonly folder: string
}

export function nameIn(text: string): string | null {
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch {
    return null
  }
  if (read === null || typeof read !== "object") return null
  const named = (read as Record<string, unknown>).name
  return typeof named === "string" ? named : null
}

export function linkingsIn(
  moved: ReadonlyMap<string, string>,
  textOf: (path: string) => string | null
): readonly Linking[] {
  const found: Linking[] = []
  for (const [from, to] of moved) {
    if (from !== MANIFEST && !from.endsWith(`${PARTED_BY}${MANIFEST}`)) continue
    const text = textOf(from)
    if (text === null) continue
    const name = nameIn(text)
    if (name !== null) found.push({ name, folder: dirname(to) })
  }
  return found
}

export function reachedAt(root: string, name: string): string {
  return join(root, MODULES, ...name.split(PARTED_BY))
}

export function pointedAt(one: Linking): string {
  return `${UP.repeat(one.name.split(PARTED_BY).length)}${one.folder}`
}

function linkAt(at: string): string | null {
  try {
    return lstatSync(at).isSymbolicLink() ? readlinkSync(at) : null
  } catch {
    return null
  }
}

function takenAt(at: string): boolean {
  try {
    lstatSync(at)
    return true
  } catch {
    return existsSync(at)
  }
}

function madeUnder(root: string, folder: string): readonly string[] {
  const made: string[] = []
  let at = join(root, folder)
  while (at !== root && at !== dirname(at) && !existsSync(at)) {
    made.push(at)
    at = dirname(at)
  }
  if (made.length > 0) mkdirSync(join(root, folder), { recursive: true })
  return made
}

function cleared(made: readonly string[]): undefined {
  for (const at of made) {
    try {
      rmdirSync(at)
    } catch {
      return
    }
  }
}

export function reachedFor(root: string, one: Linking): (() => undefined) | null {
  const at = reachedAt(root, one.name)
  const was = linkAt(at)
  if (was === null && takenAt(at)) return null
  const now = pointedAt(one)
  const made = madeUnder(root, one.folder)
  if (was === now) {
    return made.length === 0
      ? null
      : () => {
          cleared(made)
        }
  }
  mkdirSync(dirname(at), { recursive: true })
  if (was !== null) rmSync(at, { force: true })
  symlinkSync(now, at)
  return () => {
    rmSync(at, { force: true })
    if (was !== null) symlinkSync(was, at)
    cleared(made)
  }
}

export function reachedOver(root: string, many: readonly Linking[]): () => undefined {
  const undone: (() => undefined)[] = []
  for (const one of many) {
    const undo = reachedFor(root, one)
    if (undo !== null) undone.push(undo)
  }
  return () => {
    for (const one of [...undone].reverse()) one()
  }
}
