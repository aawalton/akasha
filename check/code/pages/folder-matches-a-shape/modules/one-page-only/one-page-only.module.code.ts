import { basename } from "node:path"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import { saidInside } from "akasha/check/modules/shape-saying/shape-saying.module.code.ts"
import type { Held } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

export type Answered = { readonly page: Held } | { readonly refusal: string }

export function onePageIn(standing: Standing, beside: Held | null = null): Answered {
  const page = standing.pages.find((one) => one !== beside)
  if (page === undefined) return { refusal: "it holds no page of its own" }
  if (standing.pages.length > (beside === null ? 1 : 2)) {
    return {
      refusal: `it holds ${standing.pages.length} pages rather than one: ${saidInside(standing.folder, standing.pages)}`,
    }
  }
  return { page }
}

export function looseFilesIn(
  standing: Standing,
  page: Held,
  parts: ReadonlySet<string>
): readonly string[] {
  const loose = standing.files.filter((one) => !parts.has(one))
  if (loose.length === 0) return []
  return [
    `${loose.length} files are no part of \`${page.slug}\`: ${saidInside(standing.folder, loose)}`,
  ]
}

export function namedAsAsked(standing: Standing, page: Held): readonly string[] {
  const wants = standing.naming(standing.folder)
  if (wants === null) return []
  if (wants.name === null) {
    return [
      `it wants a name this check cannot work out: \`${page.slug}\` calls its folder \`${wants.gives}\`, which is what the page above it is named`,
    ]
  }
  const named = basename(standing.folder)
  if (wants.name === named) return []
  return [
    `it is named \`${named}\` rather than \`${wants.name}\`, what \`${page.slug}\` calls its folder`,
  ]
}
