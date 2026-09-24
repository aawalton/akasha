import { dirname } from "node:path"
import { readFiles } from "akasha/page/computed-property/properties/read-files.text-property.ts"
import { readFolders } from "akasha/page/computed-property/properties/read-folders.text-property.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import {
  changeUncommitted,
  uncommittedIn,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import type { Reads } from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.code.ts"

const FOLDED_PAST = 8

const FILES = exportedAs(readFiles.propertySlug)

const FOLDERS = exportedAs(readFolders.propertySlug)

export type Kept = {
  readonly files: readonly string[]
  readonly folders: readonly string[]
}

function textsIn(held: unknown): readonly string[] {
  return Array.isArray(held) ? held.filter((one): one is string => typeof one === "string") : []
}

export function foldedReads(files: readonly string[], folders: readonly string[]): Kept {
  const kept = new Set(folders)
  const byFolder = new Map<string, Set<string>>()
  for (const one of files) {
    const at = dirname(one)
    const held = byFolder.get(at) ?? new Set<string>()
    held.add(one)
    byFolder.set(at, held)
  }
  for (const [at, held] of byFolder) if (held.size > FOLDED_PAST) kept.add(at)
  const loose = new Set(files.filter((one) => !kept.has(dirname(one))))
  return { files: [...loose].sort(), folders: [...kept].sort() }
}

function keptIn(held: Readonly<Record<string, unknown>> | null): Kept {
  return {
    files: [...textsIn(held?.[FILES])].sort(),
    folders: [...textsIn(held?.[FOLDERS])].sort(),
  }
}

function same(one: readonly string[], two: readonly string[]): boolean {
  return one.length === two.length && one.every((each, at) => each === two[at])
}

export function keptReads(root: string, read: Reads): undefined {
  for (const [at, files] of read) {
    try {
      const before = keptIn(uncommittedIn(root, at))
      const after = foldedReads([...before.files, ...files], before.folders)
      if (same(after.files, before.files) && same(after.folders, before.folders)) continue
      changeUncommitted(root, at, (held) => {
        const now = keptIn(held)
        const folded = foldedReads([...now.files, ...files], now.folders)
        return { ...(held ?? {}), [FILES]: folded.files, [FOLDERS]: folded.folders }
      })
    } catch (thrown) {
      process.stderr.write(`what \`${at}\` reads was not kept: ${String(thrown)}\n`)
    }
  }
  return undefined
}
