import { join } from "node:path"
import { exportedAs } from "../../../page/page-export-name/page-export-name.module.code.ts"
import {
  type Entry,
  textAt,
  under,
  type Value,
} from "../../index-entries/index-entries.module.code.ts"
import { indexIdentity } from "./index-identity.index.ts"

const IDENTITY = indexIdentity.indexName

const ENDING = ".jsonl"

const ALWAYS = "always"

const PAGE = "page"

export type Filed = {
  readonly scope: string
  readonly propertySlug: string
  readonly said: string
}

export function filedIn(value: Value, unique: ReadonlyMap<string, string>): readonly Filed[] {
  const id = textAt(value, "id")
  const slug = textAt(value, "slug")
  const pageTypeSlug = textAt(value, "pageTypeSlug")
  if (id === null || slug === null || pageTypeSlug === null) return []
  const held: Filed[] = []
  for (const [propertySlug, reach] of unique) {
    const said = textAt(value, exportedAs(propertySlug))
    if (said === null) continue
    held.push({ scope: reach === ALWAYS ? PAGE : pageTypeSlug, propertySlug, said })
  }
  return held
}

export function identityIn(
  value: Value,
  path: string,
  repo: string,
  unique: ReadonlyMap<string, string>
): readonly Entry[] {
  const id = textAt(value, "id")
  if (id === null) return []
  const line = JSON.stringify({ path: under(repo, path), id })
  return filedIn(value, unique).map((one) => ({
    at: join(IDENTITY, one.scope, one.propertySlug, `${one.said}${ENDING}`),
    line,
  }))
}
