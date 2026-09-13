import { basename } from "node:path"
import type { Standing } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/folder-shape.page-type.ts"
import {
  looseFilesIn,
  namedAsAsked,
  onePageIn,
} from "akasha/checks/code-checks/pages/folder-matches-a-shape/modules/one-page-only/one-page-only.module.code.ts"
import { saidInside } from "akasha/checks/modules/shape-saying/shape-saying.module.code.ts"

const DOMAIN = "domain"

export function aPageWithItsParts(standing: Standing): readonly string[] {
  const answered = onePageIn(standing)
  if ("refusal" in answered) return [answered.refusal]
  const page = answered.page
  if (standing.extending(String(page.pageTypeSlug), DOMAIN)) {
    return [`\`${page.slug}\` is a domain, which has a shape of its own`]
  }
  const parts = new Set<string>(standing.parts(page))
  const said: string[] = [...looseFilesIn(standing, page, parts), ...namedAsAsked(standing, page)]
  const stray = standing.subfolders.filter((at) => !standing.held.has(basename(at)))
  if (stray.length > 0) {
    said.push(
      `${stray.length} subfolders are no part of \`${page.slug}\`: ${saidInside(standing.folder, stray)}`
    )
  }
  return said
}
