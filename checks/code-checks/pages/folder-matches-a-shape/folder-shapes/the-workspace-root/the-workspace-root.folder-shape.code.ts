import { basename } from "node:path"
import type { Standing } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/folder-shape.page-type.ts"
import { saidInside } from "akasha/checks/modules/shape-saying/shape-saying.module.code.ts"

const ROOT = ""

const ALLOWED = new Set<string>([
  "agents",
  "alan",
  "changes",
  "checks",
  "code",
  "code-system",
  "commands",
  "design",
  "domains",
  "files",
  "git",
  "graph",
  "infrastructure",
  "pages",
  "personas",
  "persons",
  "products",
  "temper",
])

export function theWorkspaceRoot(standing: Standing): readonly string[] {
  if (standing.folder !== ROOT) {
    return [`it is \`${standing.folder}\`, a folder inside the workspace rather than its root`]
  }
  const said: string[] = []
  if (standing.files.length > 0) {
    said.push(
      `${standing.files.length} files sit in the root, and no file is allowed there yet: ${saidInside(standing.folder, standing.files)}`
    )
  }
  const other = standing.subfolders.filter((at) => !ALLOWED.has(basename(at)))
  if (other.length > 0) {
    said.push(
      `${other.length} folders sit in the root that it is not allowed to hold: ${saidInside(standing.folder, other)}`
    )
  }
  return said
}
