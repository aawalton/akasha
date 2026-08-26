import { onceInCall } from "../../cache/during-call.ts"
import { rootsHere } from "../../repo/roots/roots.ts"
import { diskFileTree } from "../file-tree.ts"
import { parseFrontmatter, textField } from "../frontmatter.ts"

const KIND_GLOB = "**/*.file-kind-domain.md"

const EXTENSION_KEY = "extension"

const BINARY_KEY = "binary"

const STATED = "true"

function binaryExtensions(): ReadonlySet<string> {
  return onceInCall("file-kinds-carrying-bytes", () => {
    const tree = diskFileTree(rootsHere())
    const found = new Set<string>()
    for (const relPath of tree.paths(KIND_GLOB)) {
      const text = tree.open(relPath)
      if (text === null) continue
      const held = parseFrontmatter(text)
      if (textField(held, BINARY_KEY) !== STATED) continue
      const extension = textField(held, EXTENSION_KEY)
      if (extension !== null) found.add(extension)
    }
    return found
  })
}

export function carriesBytes(pathish: string): boolean {
  const stem = pathish.split("/").pop() ?? pathish
  const dot = stem.lastIndexOf(".")
  if (dot <= 0) return false
  return binaryExtensions().has(stem.slice(dot + 1))
}
