import type { Domain } from "../../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../../pages-system/page-type/page-type.page-type.ts"

export type ModelFamily = Domain

export const modelFamily = {
  id: "01a0535c-f2cf-7d57-8803-2dbb722ac8bc",
  pageTypeSlug: "page-type",
  slug: "model-family",
  definition: "a family of models",
  pluralSlug: "model-families",
  partSlugs: [
    "model-family/fable",
    "model-family/haiku",
    "model-family/opus",
    "model-family/sonnet",
  ],
  extendsSlug: "page-type/domain",
} as const satisfies PageType
