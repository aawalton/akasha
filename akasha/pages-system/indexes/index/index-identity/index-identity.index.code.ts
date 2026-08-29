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

export function identityIn(
  value: Value,
  path: string,
  repo: string,
  unique: ReadonlyMap<string, string>
): readonly Entry[] {
  const id = textAt(value, "id")
  const slug = textAt(value, "slug")
  const pageTypeSlug = textAt(value, "pageTypeSlug")
  if (id === null || slug === null || pageTypeSlug === null) return []
  const line = JSON.stringify({ path: under(repo, path), id })
  const held: Entry[] = []
  for (const [named, reach] of unique) {
    const said = textAt(value, exportedAs(named))
    if (said === null) continue
    const scope = reach === ALWAYS ? PAGE : pageTypeSlug
    held.push({ at: join(IDENTITY, scope, named, `${said}${ENDING}`), line })
  }
  return held
}
