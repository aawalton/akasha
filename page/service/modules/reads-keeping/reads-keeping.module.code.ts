import { dirname, isAbsolute, join } from "node:path"
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

export function keptIn(held: Readonly<Record<string, unknown>> | null): Kept {
  return {
    files: [...textsIn(held?.[FILES])].sort(),
    folders: [...textsIn(held?.[FOLDERS])].sort(),
  }
}

function same(one: readonly string[], two: readonly string[]): boolean {
  return one.length === two.length && one.every((each, at) => each === two[at])
}

export type Readers = {
  readonly kept: (read: Reads) => undefined
  readonly reading: (computed: string, file: string) => ReadonlySet<string> | null
}

export function readersFor(root: string): Readers {
  const byRead = new Map<string, Map<string, Set<string>>>()
  const byPage = new Map<string, Map<string, readonly string[]>>()
  const pooled = new Map<string, string>()
  const pool = (said: string): string => {
    const held = pooled.get(said)
    if (held !== undefined) return held
    pooled.set(said, said)
    return said
  }
  const whole = (at: string): string => (isAbsolute(at) ? at : join(root, at))
  const heldIn = <T>(map: Map<string, T>, key: string, made: () => T): T => {
    const held = map.get(key)
    if (held !== undefined) return held
    const fresh = made()
    map.set(key, fresh)
    return fresh
  }
  const readBy = (computed: string, page: string, now: readonly string[]): undefined => {
    const reads = heldIn(byRead, computed, () => new Map<string, Set<string>>())
    const pages = heldIn(byPage, computed, () => new Map<string, readonly string[]>())
    for (const at of pages.get(page) ?? []) {
      const readers = reads.get(at)
      readers?.delete(page)
      if (readers?.size === 0) reads.delete(at)
    }
    if (now.length === 0) pages.delete(page)
    else pages.set(page, now)
    for (const at of now) heldIn(reads, at, () => new Set<string>()).add(page)
    return undefined
  }
  return {
    kept: (read) => {
      for (const [computed, one] of read) {
        for (const [page, own] of one.pages ?? []) {
          const folded = foldedReads(own.files.map(whole), own.folders.map(whole))
          readBy(pool(computed), pool(page), [...folded.files, ...folded.folders].map(pool))
        }
      }
      return undefined
    },
    reading: (computed, file) => {
      const reads = byRead.get(computed)
      if (reads === undefined) return null
      return new Set([...(reads.get(file) ?? []), ...(reads.get(dirname(file)) ?? [])])
    },
  }
}

export function keptReads(root: string, read: Reads): undefined {
  for (const [at, one] of read) {
    try {
      const before = keptIn(uncommittedIn(root, at))
      const after = foldedReads(
        [...before.files, ...one.files],
        [...before.folders, ...one.folders]
      )
      if (same(after.files, before.files) && same(after.folders, before.folders)) continue
      changeUncommitted(root, at, (held) => {
        const now = keptIn(held)
        const folded = foldedReads([...now.files, ...one.files], [...now.folders, ...one.folders])
        return { ...(held ?? {}), [FILES]: folded.files, [FOLDERS]: folded.folders }
      })
    } catch (thrown) {
      process.stderr.write(`what \`${at}\` reads was not kept: ${String(thrown)}\n`)
    }
  }
  return undefined
}
