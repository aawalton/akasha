import { specifiersIn } from "../../../code-system/code-specifier.module.code.ts"
import { judgingEachFile, overEachText } from "../../checking/checking.module.code.ts"

const TS = ".ts"

const RELATIVE = /^\.\.?\//

function found(path: string, text: string): readonly string[] {
  const said: string[] = []
  for (const one of specifiersIn(path, text)) {
    if (!RELATIVE.test(one)) continue
    if (one.endsWith(TS)) continue
    said.push(`\`${one}\` is written without the \`.ts\` extension of the file it names`)
  }
  return said
}

export const reasonsIn = overEachText(found)

export const requireImportExtension = judgingEachFile(reasonsIn)
