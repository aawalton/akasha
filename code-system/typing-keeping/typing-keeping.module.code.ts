import { createHash } from "node:crypto"
import { mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { writeFileAtomicSync } from "@akasha/utils-fs/atomic-write"
import type ts from "typescript"

const CACHED = "node_modules/.cache/akasha/typing-keeping"

const BUILT = ".tsbuildinfo"

export function versionOf(text: string): string {
  return createHash("sha256").update(text).digest("hex")
}

export function stamped(file: ts.SourceFile | undefined): ts.SourceFile | undefined {
  return file === undefined ? undefined : Object.assign(file, { version: versionOf(file.text) })
}

export function writtenTo(path: string, text: string): undefined {
  mkdirSync(dirname(path), { recursive: true })
  writeFileAtomicSync(path, text)
}

export function buildInfoAt(root: string, roots: readonly string[]): string {
  let width = 0
  for (let held = roots.length; held > 1; held = Math.floor(held / 2)) width += 1
  return join(root, CACHED, `roots-${width}${BUILT}`)
}
