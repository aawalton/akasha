import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Definition } from "../../properties/definition.standard-agent-english-property.ts"
import type { Spelling } from "./properties/spelling.text-property.ts"
import type { Variants } from "./properties/variants.text-property.ts"

export type Term = Page & {
  spelling: Spelling
  variants?: readonly Variants[]
  definition: Definition
}

export const term = {
  id: "01a081e9-9784-7d46-ac3d-c0dd6d88cb38",
  pageTypeSlug: "page-type",
  slug: "term",
  definition: "one word or phrase, and what that word means here",
  pluralSlug: "terms",
  parts: ["text-property/spelling", "text-property/variants"],
  extends: ["page-type/page"],
  properties: [
    { pagePropertySlug: "text-property/spelling", required: true, many: false },
    { pagePropertySlug: "text-property/variants", required: false, many: true, maxCount: null },
    { pagePropertySlug: "standard-agent-english-property/definition", required: true, many: false },
  ],
} as const satisfies PageType
