import { specifiersIn } from "../../../code-system/code-specifier.module.code.ts"
import type { Body } from "../../checking.module.code.ts"
import { bodyOf, overEachFile } from "../../checking.module.code.ts"
import type { Judged, Leaving } from "../../judging.module.code.ts"

const TS = ".ts"

const RELATIVE = /^\.\.?\//

export function reasonsIn(given: Body): readonly string[] {
  if (!given.path.endsWith(TS)) return []
  const text = bodyOf(given)
  if (text === null) return []
  const said: string[] = []
  for (const one of specifiersIn(given.path, text)) {
    if (!RELATIVE.test(one)) continue
    if (one.endsWith(TS)) continue
    said.push(`\`${one}\` is written without the \`.ts\` extension of the file it names`)
  }
  return said
}

export function requireImportExtension(leaving: Leaving): readonly Judged[] {
  return overEachFile(leaving, reasonsIn)
}
