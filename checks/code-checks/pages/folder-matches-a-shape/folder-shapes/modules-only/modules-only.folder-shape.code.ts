import { basename, dirname } from "node:path"
import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

const MODULES = "modules"

const MODULE = "module"

export function modulesOnly(standing: Standing): readonly string[] {
  const said: string[] = []
  const named = basename(standing.folder)
  if (named !== MODULES) said.push(`it is named \`${named}\` rather than \`${MODULES}\``)
  if (standing.files.length > 0) {
    said.push(
      `${standing.files.length} files sit in it, and a module has a folder to itself: ${saidInside(standing.folder, standing.files)}`
    )
  }
  const above = dirname(standing.folder)
  const holding = standing.holds(above)
  const declared = standing.declared(above)
  const other: string[] = []
  const loose: string[] = []
  for (const at of standing.subfolders) {
    const held = standing.holds(at)
    if (held === null || !standing.extending(held.split("/")[0] ?? "", MODULE)) {
      other.push(at)
      continue
    }
    if (holding !== null && !declared.has(held)) loose.push(at)
  }
  if (other.length > 0) {
    said.push(`${other.length} subfolders hold no module: ${saidInside(standing.folder, other)}`)
  }
  if (loose.length > 0) {
    const slug = holding === null ? "" : (holding.split("/")[1] ?? "")
    said.push(
      `${loose.length} modules are no part \`${slug}\` declares: ${saidInside(standing.folder, loose)}`
    )
  }
  return said
}
