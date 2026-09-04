import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

export function foldersOnly(standing: Standing): readonly string[] {
  if (standing.files.length === 0) return []
  const many = standing.files.length
  return [
    `${many} files sit in it rather than folders alone: ${saidInside(standing.folder, standing.files)}`,
  ]
}
