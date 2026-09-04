import { basename } from "node:path"
import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

const MODULES = "modules"

export function modulesOnly(standing: Standing): readonly string[] {
  const said: string[] = []
  const named = basename(standing.folder)
  if (named !== MODULES) said.push(`it is named \`${named}\` rather than \`${MODULES}\``)
  if (standing.files.length > 0) {
    said.push(
      `${standing.files.length} files sit in it, and a module has a folder to itself: ${saidInside(standing.folder, standing.files)}`
    )
  }
  return said
}
