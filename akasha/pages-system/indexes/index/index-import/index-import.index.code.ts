import { join } from "node:path"
import {
  landingOf,
  specifiersIn,
} from "../../../../code-system/code-specifier/code-specifier.module.code.ts"
import { type Entry, under } from "../../index-entries/index-entries.module.code.ts"
import { indexImport } from "./index-import.index.ts"

const IMPORT = indexImport.name

const ENDING = ".jsonl"

const TS = ".ts"

const OUTSIDE = ".."

export function edgesIn(body: string, path: string): readonly string[] {
  const found: string[] = []
  for (const one of specifiersIn(path, body)) {
    const landed = landingOf(path, one)
    if (landed === null || landed === OUTSIDE || landed.startsWith(`${OUTSIDE}/`)) continue
    found.push(landed)
  }
  return found
}

export function importIn(body: string, path: string, repo: string): readonly Entry[] {
  const own = under(repo, path)
  if (!own.endsWith(TS)) return []
  const line = JSON.stringify({ path: own })
  return edgesIn(body, own).map((landed) => ({
    at: join(IMPORT, "path", `${landed}${ENDING}`),
    line,
  }))
}
