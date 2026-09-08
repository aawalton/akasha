import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

const ROOT = ""

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
  if (standing.subfolders.length > 0) {
    said.push(
      `${standing.subfolders.length} folders sit in the root, and no folder is allowed there yet: ${saidInside(standing.folder, standing.subfolders)}`
    )
  }
  return said
}
