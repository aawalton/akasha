import { readFileSync } from "node:fs"
import { scratchWorld } from "../../commands/modules/scratching/scratching.module.code.ts"
import type { Typing } from "../code-typing/code-typing.module.code.ts"
import { insideOf, placingOver, typingOver } from "../code-typing/code-typing.module.code.ts"
import { wrote } from "../code-typing/code-typing.module.test-fixtures.ts"

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
    placed
  )
  return { root, typing }
}
