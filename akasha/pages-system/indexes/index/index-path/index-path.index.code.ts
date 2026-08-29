import { join } from "node:path"
import {
  type Entry,
  pathsOf,
  textAt,
  under,
  type Value,
} from "../../index-entries/index-entries.module.code.ts"
import { indexPath } from "./index-path.index.ts"

const PATH = indexPath.indexName

const ENDING = ".jsonl"

export function pathIn(
  value: Value,
  path: string,
  repo: string,
  fileProperties: ReadonlySet<string>
): readonly Entry[] {
  const id = textAt(value, "id")
  const slug = textAt(value, "slug")
  const pageTypeSlug = textAt(value, "pageTypeSlug")
  if (id === null || slug === null || pageTypeSlug === null) return []
  const line = JSON.stringify({ path: under(repo, path), id })
  return pathsOf(value, path, repo, fileProperties).map((one) => ({
    at: join(PATH, `${one}${ENDING}`),
    line,
  }))
}
