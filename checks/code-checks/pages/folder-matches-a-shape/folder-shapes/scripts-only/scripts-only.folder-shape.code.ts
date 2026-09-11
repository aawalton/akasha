import type { Standing } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/folder-shape.page-type.ts"
import { saidInside } from "akasha/checks/modules/shape-saying/shape-saying.module.code.ts"

export const HOLDS = ["scripts"]

const SHELL_SCRIPT = "shell-script"

export function scriptsOnly(standing: Standing): readonly string[] {
  const said: string[] = []
  if (standing.files.length > 0) {
    said.push(
      `${standing.files.length} files sit in it, and a script has a folder to itself: ${saidInside(standing.folder, standing.files)}`
    )
  }
  const other = standing.subfolders.filter((at) => {
    const held = standing.holds(at)
    return !held.some((one) => one.startsWith(`${SHELL_SCRIPT}/`))
  })
  if (other.length > 0) {
    said.push(
      `${other.length} subfolders are the folder of no \`${SHELL_SCRIPT}\` page: ${saidInside(standing.folder, other)}`
    )
  }
  return said
}
