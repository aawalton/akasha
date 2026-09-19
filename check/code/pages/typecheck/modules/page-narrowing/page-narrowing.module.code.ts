import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { pageNamed } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import ts from "typescript"

const OMIT = "Omit"

export type Minting = (path: string, text: string) => string

export function omittingIn(path: string, text: string, keys: readonly string[]): string | null {
  if (keys.length === 0) return null
  const held = keys.map((one) => JSON.stringify(one)).join(" | ")
  const source = parsedAs(path, text)
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declared of statement.declarationList.declarations) {
      const said = declared.initializer
      if (said === undefined || !ts.isSatisfiesExpression(said)) continue
      const at = said.type.getStart(source)
      const to = said.type.getEnd()
      return `${text.slice(0, at)}${OMIT}<${text.slice(at, to)}, ${held}>${text.slice(to)}`
    }
  }
  return null
}

export function mintingIn(change: Change, keys: readonly string[], index: Answering): Minting {
  const pageTypes = keys.length === 0 ? null : index.pageTypesIn()
  return (path, text) => {
    if (pageTypes === null || !pageNamed(path, pageTypes)) return text
    if (change.before(path) !== null) return text
    return omittingIn(path, text, keys) ?? text
  }
}
