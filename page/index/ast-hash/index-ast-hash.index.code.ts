import { join } from "node:path"
import { typeScripted } from "akasha/code/body/modules/file-kind/file-kind.module.code.ts"
import { astHashOf } from "akasha/code/reading/modules/ast-hash/ast-hash.module.code.ts"
import { speltIn } from "akasha/code/reading/modules/code-rule/code-rule.module.code.ts"
import { indexAstHash } from "akasha/page/index/ast-hash/index-ast-hash.index.ts"
import type { Entry } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { under } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { z } from "zod"

const AST_HASH = indexAstHash.name

const ENDING = ".jsonl"

const BUCKET_WIDTH = 2

export type Spelling = {
  readonly path: string
  readonly name: string
}

export function astHashAt(hash: string): string {
  return join(AST_HASH, hash.slice(-BUCKET_WIDTH), `${hash}${ENDING}`)
}

export function astHashesIn(path: string, text: string, repo: string): readonly Entry[] {
  const at = under(repo, path)
  if (!typeScripted(at)) return []
  const found: Entry[] = []
  for (const one of speltIn(at, text)) {
    if (one.forwards || one.literal) continue
    found.push({
      at: `${astHashAt(astHashOf(one.rule))}`,
      line: JSON.stringify({ path: at, name: one.name }),
    })
  }
  return found
}

const SPELT_LINE = z.object({ path: z.string(), name: z.string() })

export function speltUnder(reading: Reading, hash: string): readonly Spelling[] {
  const found: Spelling[] = []
  for (const line of reading.lines(astHashAt(hash))) {
    const said = SPELT_LINE.safeParse(JSON.parse(line))
    if (said.success) found.push(said.data)
  }
  return found
}
