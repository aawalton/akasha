import { lineOf, parsedAs } from "@akasha/code/code-source"
import { compiled } from "@akasha/code/code-typing"
import ts from "typescript"

const DECLARED = ".d.ts"

const GLOBAL = "global"

const WHY =
  "A global name is declared in a declaration file. `global-declared-once` compares the names the declaration files declare against one another and against each `declare global` block a module body holds. It compares no module body against another module body, so a name declared here is judged against part of the tree rather than against all of it."

const HOW =
  "Lift the block into a `.d.ts` beside this file, where each `const` becomes `declare const`, and turn the module page into a type-declaration page."

export function moduleAt(path: string): boolean {
  return compiled(path) && !path.endsWith(DECLARED)
}

export function reasonsIn(path: string, text: string): readonly string[] {
  const source = parsedAs(path, text)
  const said: string[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isModuleDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === GLOBAL) {
      said.push(
        `a \`declare global\` block is written at line ${lineOf(source, node)}. ${WHY} ${HOW}`
      )
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return said
}
