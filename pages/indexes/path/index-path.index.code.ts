import { existsSync } from "node:fs"
import { join } from "node:path"
import type {
  Entry,
  FilePropertiesBy,
  FoldersBy,
  UncommittedBy,
} from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { indexPath } from "akasha/pages/indexes/path/index-path.index.ts"
import {
  claimsOf,
  type IsThere,
  type SidecarsBy,
  under,
} from "akasha/pages/indexes/path-claiming/path-claiming.module.code.ts"
import { keepWhole } from "akasha/pages/indexes/rebuilding/rebuilding.module.code.ts"
import { indexIn, readingAt } from "akasha/pages/indexes/surface/index-surface.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const PATH = indexPath.name

const ENDING = ".jsonl"

export type Bodied = {
  readonly before: string | null
  readonly after: string | null
}

export type Claiming = (value: Value, path: string, was: boolean) => readonly Entry[]

const NOTHING: ReadonlyMap<string, Bodied> = new Map()

function thereIn(repo: string, carried: ReadonlyMap<string, Bodied>, was: boolean): IsThere {
  return (at) => {
    const held = carried.get(at)
    if (held === undefined) return existsSync(join(repo, at))
    return (was ? held.before : held.after) !== null
  }
}

export function pathAt(at: string): string {
  return at.slice(PATH.length + 1, -ENDING.length)
}

export function fileFor(at: string): string {
  return join(PATH, `${at}${ENDING}`)
}

export function claimedIn(
  value: Value,
  path: string,
  repo: string,
  fileProperties: FilePropertiesBy,
  sidecars: SidecarsBy,
  withheld?: UncommittedBy,
  there?: IsThere,
  folders?: FoldersBy
): readonly string[] {
  const id = textAt(value, "id")
  const slug = textAt(value, "slug")
  const pageTypeSlug = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
  if (id === null || slug === null || pageTypeSlug === null) return []
  return claimsOf(value, path, repo, fileProperties, sidecars, withheld, there, folders)
}

export function pathIn(
  value: Value,
  path: string,
  repo: string,
  fileProperties: FilePropertiesBy,
  sidecars: SidecarsBy,
  withheld?: UncommittedBy,
  there?: IsThere,
  folders?: FoldersBy
): readonly Entry[] {
  const line = JSON.stringify({ path: under(repo, path), id: textAt(value, "id") })
  return claimedIn(value, path, repo, fileProperties, sidecars, withheld, there, folders).map(
    (one) => ({ at: fileFor(one), line })
  )
}

export function claimingIn(
  repo: string,
  fileProperties: FilePropertiesBy,
  sidecars: SidecarsBy,
  withheld?: UncommittedBy,
  folders?: FoldersBy,
  carried: ReadonlyMap<string, Bodied> = NOTHING
): Claiming {
  return (value, path, was) =>
    pathIn(
      value,
      path,
      repo,
      fileProperties,
      sidecars,
      withheld,
      thereIn(repo, carried, was),
      folders
    )
}

export function partFiled(repo: string, page: string, at: string): undefined {
  const root = indexIn(repo)
  const held = readingAt(root).lines(fileFor(under(repo, page)))
  if (held.length === 0) return
  keepWhole(join(root, fileFor(under(repo, at))), held, root)
}

export function partUnfiled(repo: string, at: string): undefined {
  const root = indexIn(repo)
  keepWhole(join(root, fileFor(under(repo, at))), [], root)
}
