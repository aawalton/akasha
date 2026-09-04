import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { ModelName } from "./properties/model-name.text-property.ts"

export type ModelFamily = Domain & {
  name: ModelName
}

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
    "text-property/model-name",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [{ pagePropertySlug: "model-name", required: true, many: false }],
} as const satisfies PageType
