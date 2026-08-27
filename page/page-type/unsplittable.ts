import { onceInCall } from "../../during-call/during-call.ts"
import { rootsHere } from "../../repo/roots/roots.ts"
import { diskFileTree } from "../file-tree.ts"
import { parseFrontmatter, textField } from "../frontmatter.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"

const TYPE_GLOB = "**/*.page-type.md"

const SLUG_KEY = "slug"

const UNSPLITTABLE_KEY = "unsplittable"

const STATED = "true"

function unsplittableTypes(): ReadonlySet<string> {
  return onceInCall("page-types-unsplittable", () => {
    const tree = diskFileTree(rootsHere())
    const found = new Set<string>()
    for (const relPath of tree.paths(TYPE_GLOB)) {
      const text = tree.open(relPath)
      if (text === null) continue
      const held = parseFrontmatter(text)
      if (textField(held, UNSPLITTABLE_KEY) !== STATED) continue
      const slug = textField(held, SLUG_KEY)
      if (slug !== null) found.add(slug)
    }
    return found
  })
}

export function typeUnsplittable(pathish: string): boolean {
  const kind = pageTypeOf(pathish)
  return kind !== null && unsplittableTypes().has(kind)
}
