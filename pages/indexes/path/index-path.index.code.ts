import { existsSync } from "node:fs"
import { join } from "node:path"
import { textAt, type Value } from "@akasha/pages/page-value"
import type { Entry, FilePropertiesBy, FoldersBy } from "../entries/index-entries.module.code.ts"
import {
  claimsOf,
  type IsThere,
  type SidecarsBy,
  under,
} from "../path-claiming/path-claiming.module.code.ts"
import { indexPath } from "./index-path.index.ts"

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

export function claimedIn(
  value: Value,
  path: string,
  repo: string,
  fileProperties: FilePropertiesBy,
  sidecars: SidecarsBy,
  there?: IsThere,
  folders?: FoldersBy
): readonly string[] {
  const id = textAt(value, "id")
  const slug = textAt(value, "slug")
  const pageTypeSlug = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
  if (id === null || slug === null || pageTypeSlug === null) return []
  return claimsOf(value, path, repo, fileProperties, sidecars, there, folders)
}

export function pathIn(
  value: Value,
  path: string,
  repo: string,
  fileProperties: FilePropertiesBy,
  sidecars: SidecarsBy,
  there?: IsThere,
  folders?: FoldersBy
): readonly Entry[] {
  const line = JSON.stringify({ path: under(repo, path), id: textAt(value, "id") })
  return claimedIn(value, path, repo, fileProperties, sidecars, there, folders).map((one) => ({
    at: join(PATH, `${one}${ENDING}`),
    line,
  }))
}

export function claimingIn(
  repo: string,
  fileProperties: FilePropertiesBy,
  sidecars: SidecarsBy,
  carried: ReadonlyMap<string, Bodied> = NOTHING,
  folders?: FoldersBy
): Claiming {
  return (value, path, was) =>
    pathIn(value, path, repo, fileProperties, sidecars, thereIn(repo, carried, was), folders)
}
