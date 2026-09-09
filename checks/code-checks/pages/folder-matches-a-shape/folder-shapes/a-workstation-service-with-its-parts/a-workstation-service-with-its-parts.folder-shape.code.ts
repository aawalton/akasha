import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

export const HOLDS = "workstation-services"

const SERVICE = "workstation-service"

export function aWorkstationServiceWithItsParts(standing: Standing): readonly string[] {
  const page = standing.pages[0]
  if (page === undefined) return ["it holds no page of its own"]
  if (standing.pages.length > 1) {
    return [
      `it holds ${standing.pages.length} pages rather than one: ${saidInside(standing.folder, standing.pages)}`,
    ]
  }
  if (page.pageTypeSlug !== SERVICE) {
    return [`\`${page.slug}\` is a \`${page.pageTypeSlug}\` rather than a \`${SERVICE}\``]
  }
  const said: string[] = []
  const parts = new Set<string>(standing.parts(page))
  const loose = standing.files.filter((one) => !parts.has(one))
  if (loose.length > 0) {
    said.push(
      `${loose.length} files are no part of \`${page.slug}\`: ${saidInside(standing.folder, loose)}`
    )
  }
  if (standing.subfolders.length > 0) {
    said.push(
      `${standing.subfolders.length} subfolders sit in it, and a service holds none: ${saidInside(standing.folder, standing.subfolders)}`
    )
  }
  return said
}
