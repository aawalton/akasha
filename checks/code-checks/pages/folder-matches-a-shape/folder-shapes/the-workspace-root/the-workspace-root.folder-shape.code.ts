import { basename } from "node:path"
import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

const ROOT = ""

const ALLOWED = new Set<string>([
  "agents",
  "alan",
  "all-about-alan",
  "changes",
  "checks",
  "commands",
  "graph",
  "infrastructure",
  "pages",
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
