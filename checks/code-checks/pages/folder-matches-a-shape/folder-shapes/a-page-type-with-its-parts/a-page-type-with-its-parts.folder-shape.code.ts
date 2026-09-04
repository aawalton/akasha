import { basename } from "node:path"
import type { Held } from "@akasha/pages-system/page-file-name"
import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

const PAGE_TYPE = "page-type"

const PACKAGE = "workspace-package"

const HELD = new Set<string>(["modules", "pages", "properties", "scripts"])

function packageIn(standing: Standing): Held | null {
  if (standing.pages.length !== 2) return null
  const above = standing.declaring(standing.folder)
  if (above === null || above.pluralSlug === null) return null
  const found = standing.pages.filter(
    (one) => one.pageTypeSlug === PACKAGE && one.slug === above.pluralSlug
  )
  return found.length === 1 ? (found[0] ?? null) : null
}

export function aPageTypeWithItsParts(standing: Standing): readonly string[] {
  const beside = packageIn(standing)
  const page = standing.pages.find((one) => one !== beside)
  if (page === undefined) return ["it holds no page of its own"]
  if (standing.pages.length > (beside === null ? 1 : 2)) {
    return [
      `it holds ${standing.pages.length} pages rather than one: ${saidInside(standing.folder, standing.pages)}`,
    ]
  }
  if (!standing.extending(String(page.pageTypeSlug), PAGE_TYPE)) {
    return [`\`${page.slug}\` is a \`${page.pageTypeSlug}\` rather than a page type`]
  }
  const said: string[] = []
  const parts = new Set<string>([
    ...standing.parts(page),
    ...(beside === null ? [] : standing.parts(beside)),
  ])
  const loose = standing.files.filter((one) => !parts.has(one))
  if (loose.length > 0) {
    said.push(
      `${loose.length} files are no part of \`${page.slug}\`: ${saidInside(standing.folder, loose)}`
    )
  }
  const named = basename(standing.folder)
  const wants = standing.naming(standing.folder)
  if (wants !== null && wants !== named) {
    said.push(
      `it is named \`${named}\` rather than \`${wants}\`, what \`${page.slug}\` calls its folder`
    )
  }
  const declared = standing.declared(standing.folder)
  const stray = standing.subfolders.filter((at) => {
    if (HELD.has(basename(at))) return false
    const held = standing.holds(at)
    return held === null || !declared.has(held)
  })
  if (stray.length > 0) {
    said.push(
      `${stray.length} subfolders are no part \`${page.slug}\` declares: ${saidInside(standing.folder, stray)}`
    )
  }
  return said
}
