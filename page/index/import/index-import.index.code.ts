import { join } from "node:path"
import { importsIn } from "akasha/code/reading/modules/code-importing/code-importing.module.code.ts"
import {
  NAMING_NONE,
  type Naming,
} from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import { typed } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { indexImport } from "akasha/page/index/import/index-import.index.ts"
import type { Entry } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { under } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"

const IMPORT = indexImport.name

const ENDING = ".jsonl"

export function importIn(
  body: string,
  path: string,
  repo: string,
  naming: Naming = NAMING_NONE
): readonly Entry[] {
  const own = under(repo, path)
  if (!typed(own)) return []
  const line = JSON.stringify({ path: own })
  return importsIn(body, own, naming).map((landed) => ({
    at: join(IMPORT, "path", `${landed}${ENDING}`),
    line,
  }))
}
