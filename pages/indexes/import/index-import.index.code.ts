import { join } from "node:path"
import {
  landingOf,
  NAMING_NONE,
  type Naming,
  specifiersIn,
} from "akasha/code-system/code-specifier/code-specifier.module.code.ts"
import { typed } from "akasha/code-system/code-typing/code-typing.module.code.ts"
import type { Entry } from "../entries/index-entries.module.code.ts"
import { under } from "../path-claiming/path-claiming.module.code.ts"
import { indexImport } from "./index-import.index.ts"

const IMPORT = indexImport.name

const ENDING = ".jsonl"

const OUTSIDE = ".."

export function edgesIn(
  body: string,
  path: string,
  naming: Naming = NAMING_NONE
): readonly string[] {
  const found: string[] = []
  for (const one of specifiersIn(path, body)) {
    const landed = landingOf(path, one, naming)
    if (landed === null || landed === OUTSIDE || landed.startsWith(`${OUTSIDE}/`)) continue
    found.push(landed)
  }
  return found
}

export function importIn(
  body: string,
  path: string,
  repo: string,
  naming: Naming = NAMING_NONE
): readonly Entry[] {
  const own = under(repo, path)
  if (!typed(own)) return []
  const line = JSON.stringify({ path: own })
  return edgesIn(body, own, naming).map((landed) => ({
    at: join(IMPORT, "path", `${landed}${ENDING}`),
    line,
  }))
}
