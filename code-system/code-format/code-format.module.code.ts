import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { classifyExtension, type FileKind } from "akasha/code/file-kind/file-kind.module.code.ts"
import { linterEnv } from "akasha/code-system/code-lint/code-lint.module.code.ts"
import { insideOf } from "akasha/code-system/test-overlay/test-overlay.module.code.ts"
import { bytes } from "akasha/utils/run/running/running.module.code.ts"

const BIOME_AT = "node_modules/.bin/biome"

const HOLD = "/var/tmp"

const PREFIX = "akasha-format-"

const CONFIG = "biome.json"

const CARRIED: readonly string[] = [CONFIG, ".gitignore"]

const FORMATS: ReadonlySet<FileKind> = new Set<FileKind>(["ts", "tsx", "js", "jsx", "css"])

const CHECKS = "check"

const REWRITES = "--write"

const OVER = "--stdin-file-path="

export type Formatted = {
  readonly body: Uint8Array
  readonly changed: boolean
}

function sameAs(one: Uint8Array, other: Uint8Array): boolean {
  if (one.byteLength !== other.byteLength) return false
  return one.every((byte, at) => byte === other[at])
}

const LAST_ASCII = 0x7f

function marksOf(body: Uint8Array): string {
  const found: string[] = []
  for (const mark of new TextDecoder().decode(body)) {
    if ((mark.codePointAt(0) ?? 0) > LAST_ASCII) found.push(mark)
  }
  return found.sort().join("")
}

function keepsItsMarks(was: Uint8Array, now: Uint8Array): boolean {
  return marksOf(was) === marksOf(now)
}

function takenOver(was: Uint8Array, said: Uint8Array): Formatted {
  const held: Formatted = { body: was, changed: false }
  if (said.byteLength === 0 || sameAs(said, was)) return held
  if (!keepsItsMarks(was, said)) return held
  return { body: said, changed: true }
}

function formats(path: string): boolean {
  if (!insideOf(path)) return false
  if (path === CONFIG) return true
  const kind = classifyExtension(path)
  return kind !== null && FORMATS.has(kind)
}

export function formattedBody(root: string, path: string, body: Uint8Array): Formatted {
  const held: Formatted = { body, changed: false }
  const kind = classifyExtension(path)
  if (kind === null || !FORMATS.has(kind)) return held
  try {
    const done = bytes([join(root, BIOME_AT), CHECKS, REWRITES, `${OVER}${path}`], {
      cwd: root,
      env: linterEnv(),
      stdin: body,
    })
    if (done.code !== 0) return held
    return takenOver(body, done.out)
  } catch {
    return held
  }
}

function bodyOr(at: string): Uint8Array | null {
  try {
    return readFileSync(at)
  } catch {
    return null
  }
}

export function formattedBodies(
  root: string,
  bodies: ReadonlyMap<string, Uint8Array>
): ReadonlyMap<string, Formatted> {
  const done = new Map<string, Formatted>()
  const taking: (readonly [string, Uint8Array])[] = []
  for (const [path, body] of bodies) {
    if (formats(path)) taking.push([path, body])
    else done.set(path, { body, changed: false })
  }
  if (taking.length === 0) return done
  const held = mkdtempSync(join(HOLD, PREFIX))
  try {
    for (const one of CARRIED) {
      const carried = bodyOr(join(root, one))
      if (carried !== null) writeFileSync(join(held, one), carried)
    }
    for (const [path, body] of taking) {
      const at = join(held, path)
      mkdirSync(dirname(at), { recursive: true })
      writeFileSync(at, body)
    }
    bytes([join(root, BIOME_AT), CHECKS, REWRITES, held], { cwd: held, env: linterEnv() })
    for (const [path, body] of taking) {
      const back = bodyOr(join(held, path))
      done.set(path, back === null ? { body, changed: false } : takenOver(body, back))
    }
  } catch {
    for (const [path, body] of taking) done.set(path, { body, changed: false })
  } finally {
    rmSync(held, { recursive: true, force: true })
  }
  return done
}
