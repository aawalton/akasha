import { createHash } from "node:crypto"
import { mkdirSync } from "node:fs"
import { dirname } from "node:path"
import { writeFileAtomicSync } from "@akasha/utils-fs/atomic-write"
import type ts from "typescript"

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
