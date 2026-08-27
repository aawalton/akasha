import { onceInCall } from "../../during-call/during-call.ts"
import { rootsHere } from "../../repo/roots/roots.ts"
import { diskFileTree } from "../file-tree.ts"
import { parseFrontmatter, textField } from "../frontmatter.ts"
import { claimedAt, fileNameOf } from "./name-pattern.ts"

const KIND_GLOB = "**/*.file-kind-domain.md"

const PATTERN_KEY = "name-pattern"

const UNSPLITTABLE_KEY = "unsplittable"

const STATED = "true"

function splitClaims(): ReadonlyArray<readonly [string, boolean]> {
  return onceInCall("file-kinds-unsplittable", () => {
    const tree = diskFileTree(rootsHere())
    const found: (readonly [string, boolean])[] = []
    for (const relPath of tree.paths(KIND_GLOB)) {
      const text = tree.open(relPath)
      if (text === null) continue
      const held = parseFrontmatter(text)
      const pattern = textField(held, PATTERN_KEY)
      if (pattern === null) continue
      found.push([pattern, textField(held, UNSPLITTABLE_KEY) === STATED])
    }
    return found
  })
}

export function kindUnsplittable(pathish: string): boolean {
  return claimedAt(fileNameOf(pathish), splitClaims()) ?? false
}
