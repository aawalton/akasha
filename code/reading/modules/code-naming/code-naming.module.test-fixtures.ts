import { readFileSync } from "node:fs"
import { keyOf } from "akasha/code/reading/modules/code-naming/code-naming.module.code.ts"
import type { Typing } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import {
  insideOf,
  placingOver,
  typingOver,
} from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import {
  WITHOUT_BROWSER,
  wrote,
} from "akasha/code/reading/modules/code-typing/code-typing.module.test-fixtures.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import ts from "typescript"

export const KEYS_SAID =
  "export function heldOf(said: readonly string[]): Held {\n  return { keyed: said }\n}\n"

export const scratch = scratchWorld()

function onDisk(at: string): string | undefined {
  try {
    return readFileSync(at, "utf8")
  } catch {
    return undefined
  }
}

export function typed(said: Readonly<Record<string, string>>): {
  root: string
  typing: Typing
} {
  const root = scratch.rootFor("akasha-naming-")
  const paths = wrote(root, said)
  const placed = placingOver(paths, (at) => said[at] ?? null)
  const typing = typingOver(
    root,
    paths,
    (at) => {
      const rel = insideOf(root, at)
      return rel === null ? onDisk(at) : said[rel]
    },
    placed,
    WITHOUT_BROWSER
  )
  return { root, typing }
}

export function declarationsNamed(typing: Typing, path: string, key: string): readonly ts.Node[] {
  const source = typing.sourceAt(path)
  if (source === null) return []
  const found: ts.Node[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isPropertySignature(node) && keyOf(node.name) === key) found.push(node)
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}
