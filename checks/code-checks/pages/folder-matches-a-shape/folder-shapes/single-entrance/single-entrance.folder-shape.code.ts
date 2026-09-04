import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

const DECLARATION = ".d.ts"

export function singleEntrance(standing: Standing): readonly string[] {
  const entrances = standing.files.filter(
    (path) => !path.endsWith(DECLARATION) && standing.entered(path)
  )
  if (entrances.length <= 1) return []
  return [
    `${entrances.length} files in it are reached from outside rather than one: ${saidInside(standing.folder, entrances)}`,
  ]
}
