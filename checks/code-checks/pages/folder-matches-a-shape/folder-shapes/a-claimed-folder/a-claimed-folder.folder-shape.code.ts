import type { Standing } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/folder-shape.page-type.ts"
import { saidInside } from "akasha/checks/modules/shape-saying/shape-saying.module.code.ts"

export function aClaimedFolder(standing: Standing): readonly string[] {
  if (!standing.claimed(standing.folder)) {
    return ["no page above it claims this folder"]
  }
  if (standing.files.length === 0 && standing.subfolders.length === 0) {
    return ["it holds nothing"]
  }
  const named = [...standing.pages, ...standing.properties]
  if (named.length === 0) return []
  return [
    `${named.length} files here are a page or a file a page names: ${saidInside(standing.folder, named)}`,
  ]
}
