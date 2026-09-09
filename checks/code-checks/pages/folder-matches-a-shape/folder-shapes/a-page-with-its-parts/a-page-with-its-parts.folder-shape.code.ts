import { basename } from "node:path"
import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

export function aPageWithItsParts(standing: Standing): readonly string[] {
  const page = standing.pages[0]
  if (page === undefined) return ["it holds no page of its own"]
  if (standing.pages.length > 1) {
    return [
      `it holds ${standing.pages.length} pages rather than one: ${saidInside(standing.folder, standing.pages)}`,
    ]
  }
  const said: string[] = []
  const parts = new Set<string>(standing.parts(page))
  const loose = standing.files.filter((one) => !parts.has(one))
  if (loose.length > 0) {
    said.push(
      `${loose.length} files are no part of \`${page.slug}\`: ${saidInside(standing.folder, loose)}`
    )
  }
  const named = basename(standing.folder)
  const wants = standing.naming(standing.folder)
  if (wants !== null && wants.name === null) {
    said.push(
      `it wants a name this check cannot work out: \`${page.slug}\` calls its folder \`${wants.gives}\`, which is what the page above it is named`
    )
  } else if (wants !== null && wants.name !== named) {
    said.push(
      `it is named \`${named}\` rather than \`${wants.name}\`, what \`${page.slug}\` calls its folder`
    )
  }
  const stray = standing.subfolders.filter((at) => !standing.held.has(basename(at)))
  if (stray.length > 0) {
    said.push(
      `${stray.length} subfolders are no part of \`${page.slug}\`: ${saidInside(standing.folder, stray)}`
    )
  }
  return said
}
