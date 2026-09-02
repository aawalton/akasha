import { existsSync, readFileSync, realpathSync } from "node:fs"
import { dirname, resolve } from "node:path"

const SHEBANG = /^#![^\n]*(\n|$)/
const VENDOR = "node_modules"

export const REACHED_CEILING = 1_000

export type Unresolved = {
  readonly file: string
  readonly path: string
}

export type Reached = {
  readonly files: readonly string[]
  readonly unresolved: readonly Unresolved[]
}

export type Closure = {
  readonly files: ReadonlySet<string>
  readonly unscanned: readonly string[]
  readonly unresolved: readonly Unresolved[]
  readonly stopped: boolean
}

export function withoutShebang(text: string): string {
  return text.replace(SHEBANG, "")
}

export function realPathOf(at: string): string {
  return existsSync(at) ? realpathSync(at) : resolve(at)
}

export function insideRepo(root: string, at: string): boolean {
  if (!at.startsWith(`${root}/`)) return false
  return !at
    .slice(root.length + 1)
    .split("/")
    .includes(VENDOR)
}

export function importsIn(file: string, root: string): Reached | null {
  let text: string
  try {
    text = readFileSync(file, "utf8")
  } catch {
    return null
  }
  let scanned: readonly { readonly path: string }[]
  try {
    scanned = new Bun.Transpiler({ loader: "ts" }).scanImports(withoutShebang(text))
  } catch {
    return null
  }
  const files: string[] = []
  const unresolved: Unresolved[] = []
  const from = dirname(file)
  for (const one of scanned) {
    let at: string
    try {
      at = Bun.resolveSync(one.path, from)
    } catch {
      unresolved.push({ file, path: one.path })
      continue
    }
    if (!at.startsWith("/")) continue
    const real = realPathOf(at)
    if (insideRepo(root, real)) files.push(real)
  }
  return { files, unresolved }
}

export function localClosure(entry: string, root: string): Closure {
  const files = new Set<string>()
  const unscanned: string[] = []
  const unresolved: Unresolved[] = []
  let stopped = false
  const pending = [realPathOf(entry)]
  while (pending.length > 0) {
    const one = pending.pop()
    if (one === undefined || files.has(one)) continue
    if (files.size >= REACHED_CEILING) {
      stopped = true
      break
    }
    files.add(one)
    const reached = importsIn(one, root)
    if (reached === null) {
      unscanned.push(one)
      continue
    }
    for (const missing of reached.unresolved) unresolved.push(missing)
    for (const at of reached.files) pending.push(at)
  }
  unresolved.sort((a, b) => a.file.localeCompare(b.file) || a.path.localeCompare(b.path))
  return { files, unscanned: unscanned.sort(), unresolved, stopped }
}
