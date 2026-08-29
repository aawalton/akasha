import { join } from "node:path"
import { specifiersIn } from "../../../../code-system/code-specifier/code-specifier.module.code.ts"
import { type Entry, importedBy, under } from "../../index-entries/index-entries.module.code.ts"
import { indexImport } from "./index-import.index.ts"

const IMPORT = indexImport.indexName

const ENDING = ".jsonl"

const TS = ".ts"

export function importIn(body: string, path: string, repo: string): readonly Entry[] {
  const own = under(repo, path)
  if (!own.endsWith(TS)) return []
  const line = JSON.stringify({ path: own })
  const found: Entry[] = []
  for (const one of specifiersIn(own, body)) {
    const landed = importedBy(own, one)
    if (landed === null) continue
    found.push({ at: join(IMPORT, "path", `${landed}${ENDING}`), line })
  }
  return found
}
