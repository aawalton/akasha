import { onceInCall } from "../../during-call/during-call.ts"
import { rootsHere } from "../../repo/roots/roots.ts"
import { diskFileTree } from "../file-tree.ts"
import { parseFrontmatter, textField } from "../frontmatter.ts"
import { typeSuffixOf } from "../page-types.ts"

const TYPE_GLOB = "**/*.page-type.md"

const SLUG_KEY = "slug"

const UNBOUNDED_KEY = "unbounded"

const STATED = "true"

function unboundedTypes(): ReadonlySet<string> {
  return onceInCall("page-types-held-to-no-ceiling", () => {
    const tree = diskFileTree(rootsHere())
    const found = new Set<string>()
    for (const relPath of tree.paths(TYPE_GLOB)) {
      const text = tree.open(relPath)
      if (text === null) continue
      const held = parseFrontmatter(text)
      if (textField(held, UNBOUNDED_KEY) !== STATED) continue
      const slug = textField(held, SLUG_KEY)
      if (slug !== null) found.add(slug)
    }
    return found
  })
}

export function heldToNoCeiling(pathish: string): boolean {
  const suffix = typeSuffixOf(pathish)
  if (suffix === "") return false
  return unboundedTypes().has(suffix)
}
