import { onceInCall } from "../../during-call/during-call.ts"
import { rootsHere } from "../../repo/roots/roots.ts"
import { diskFileTree } from "../file-tree.ts"
import { parseFrontmatter, textField } from "../frontmatter.ts"
import { claimedAt, fileNameOf } from "./name-pattern.ts"

const KIND_GLOB = "**/*.file-kind-domain.md"

const PATTERN_KEY = "name-pattern"

const BINARY_KEY = "binary"

const STATED = "true"

function byteClaims(): ReadonlyArray<readonly [string, boolean]> {
  return onceInCall("file-kinds-carrying-bytes", () => {
    const tree = diskFileTree(rootsHere())
    const found: (readonly [string, boolean])[] = []
    for (const relPath of tree.paths(KIND_GLOB)) {
      const text = tree.open(relPath)
      if (text === null) continue
      const held = parseFrontmatter(text)
      const pattern = textField(held, PATTERN_KEY)
      if (pattern === null) continue
      found.push([pattern, textField(held, BINARY_KEY) === STATED])
    }
    return found
  })
}

export function carriesBytes(pathish: string): boolean {
  return claimedAt(fileNameOf(pathish), byteClaims()) ?? false
}
