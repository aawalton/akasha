import { lineOf, parsedAs } from "@akasha/code-system/code-source"
import { compiled } from "@akasha/code-system/code-typing"
import ts from "typescript"
import type { Selector, Text } from "../../../modules/change-walking/change-walking.module.code.ts"
import { judgingEach, TEXTS } from "../../../modules/change-walking/change-walking.module.code.ts"

const DECLARED = ".d.ts"

const GLOBAL = "global"

const WHY =
  "A global name is declared in a declaration file. `declarations-agree` compiles every `.d.ts` akasha holds as one program and catches a disagreement between any two, and nothing at all reads a `declare global` block in a module body."

const HOW =
  "Lift the block into a `.d.ts` beside this file, where each `const` becomes `declare const`, and turn the module page into a type-declaration page."

export function moduleAt(path: string): boolean {
  return compiled(path) && !path.endsWith(DECLARED)
}

const MODULES: Selector<Text> = {
  named: "the modules akasha compiles",
  isInput: (path) => moduleAt(path),
  from: (change, shadow) => TEXTS.from(change, shadow).filter((one) => moduleAt(one.path)),
}

export function reasonsIn(given: Text): readonly string[] {
  const source = parsedAs(given.path, given.text)
  const said: string[] = []
  for (const one of source.statements) {
    if (!ts.isModuleDeclaration(one)) continue
    if (!ts.isIdentifier(one.name) || one.name.text !== GLOBAL) continue
    said.push(`a \`declare global\` block is written at line ${lineOf(source, one)}. ${WHY} ${HOW}`)
  }
  return said
}

export const noGlobalInAModule = judgingEach(MODULES, (given) => reasonsIn(given))
