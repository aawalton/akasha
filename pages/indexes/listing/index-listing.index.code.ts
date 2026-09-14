import { existsSync } from "node:fs"
import { join } from "node:path"
import { indexListing } from "akasha/pages/indexes/listing/index-listing.index.ts"
import type {
  Entry,
  FilePropertiesBy,
  FoldersBy,
  UncommittedBy,
} from "akasha/pages/indexes/modules/entries/index-entries.module.code.ts"
import {
  claimsOf,
  type IsThere,
  type SidecarsBy,
} from "akasha/pages/indexes/modules/path-claiming/path-claiming.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"

export const LISTED_UNDER = indexListing.name

export const LISTED_AT = join(LISTED_UNDER, "path.jsonl")

export type Bodied = {
  readonly before: string | null
  readonly after: string | null
}

export type Claiming = (value: Value, path: string, was: boolean) => readonly string[]

const NOTHING: ReadonlyMap<string, Bodied> = new Map()

function thereIn(repo: string, carried: ReadonlyMap<string, Bodied>, was: boolean): IsThere {
  return (at) => {
    const held = carried.get(at)
    if (held === undefined) return existsSync(join(repo, at))
    return (was ? held.before : held.after) !== null
  }
}

export function pathsIn(
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

export function claimingIn(
  repo: string,
  fileProperties: FilePropertiesBy,
  sidecars: SidecarsBy,
  withheld?: UncommittedBy,
  folders?: FoldersBy,
  carried: ReadonlyMap<string, Bodied> = NOTHING
): Claiming {
  return (value, path, was) =>
    pathsIn(
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

export function listedOf(paths: readonly string[]): readonly Entry[] {
  return paths.map((one) => ({ at: LISTED_AT, line: one }))
}
