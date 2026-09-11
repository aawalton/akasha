import { mkdirSync } from "node:fs"
import { dirname } from "node:path"
import { writeFileAtomicSync } from "akasha/utils/fs/atomic-write/atomic-write.module.code.ts"
import { sha256Hex } from "akasha/utils/hashing/sha256-hex/sha256-hex.module.code.ts"
import type ts from "typescript"

export function stamped(file: ts.SourceFile | undefined): ts.SourceFile | undefined {
  return file === undefined ? undefined : Object.assign(file, { version: sha256Hex(file.text) })
}

export function writtenTo(path: string, text: string): undefined {
  mkdirSync(dirname(path), { recursive: true })
  writeFileAtomicSync(path, text)
}
