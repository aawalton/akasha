import ts from "typescript"
import { skimmedAs } from "../../../code-system/code-source/code-source.module.code.ts"
import { landingOf } from "../../../code-system/code-specifier/code-specifier.module.code.ts"
import { judgingEachFile, overEachText } from "../../change-walking/change-walking.module.code.ts"

const INDEXES = "akasha/pages-system/indexes/"

const SHADOW = "akasha/pages-system/shadow/"

const REACHED: ReadonlySet<string> = new Set([
  "beneath",
  "identityAt",
  "indexAt",
  "indexIn",
  "overlaidOn",
  "readingAt",
  "readingOf",
  "staleFor",
  "stampBuilt",
  "stampIn",
  "stampKept",
  "stampSettled",
])

const SAID = "the indexes folder answers questions; a path into the index is not one of its answers"

function takenFrom(one: ts.ImportDeclaration, path: string): readonly string[] {
  if (!ts.isStringLiteral(one.moduleSpecifier)) return []
  const landed = landingOf(path, one.moduleSpecifier.text)
  if (landed === null || !landed.startsWith(INDEXES)) return []
  const held = one.importClause?.namedBindings
  if (held === undefined || !ts.isNamedImports(held)) return []
  return held.elements
    .map((each) => (each.propertyName ?? each.name).text)
    .filter((name) => REACHED.has(name))
}

function found(path: string, text: string): readonly string[] {
  if (path.startsWith(INDEXES) || path.startsWith(SHADOW)) return []
  const said: string[] = []
  for (const one of skimmedAs(path, text).statements) {
    if (!ts.isImportDeclaration(one)) continue
    for (const name of takenFrom(one, path)) {
      said.push(`\`${name}\` hands back a path into the index or a raw read of it — ${SAID}`)
    }
  }
  return said
}

export const reasonsIn = overEachText(found)

export const indexAskedNotReached = judgingEachFile(reasonsIn)
