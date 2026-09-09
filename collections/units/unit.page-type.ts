import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { Words } from "./properties/words.number-property.ts"

export type Unit = Domain & {
  words: Words
}

export const unit = {
  id: "01a063de-2c60-7014-9620-56bbc19efcd1",
  pageTypeSlug: "page-type",
  slug: "unit",
  definition: "what a length is counted in",
  pluralSlug: "units",
  partSlugs: [
    "number-property/words",
    "unit/hours",
    "unit/minutes",
    "unit/moments",
    "unit/seconds",
    "unit/words",
  ],
  extends: ["page-type/domain"],
  properties: [{ pagePropertySlug: "number-property/words", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A unit says its worth in words.",
    },
    {
      invariantKind: "departure",
      statement: "Words are the unit every other unit is weighed against.",
    },
  ],
} as const satisfies PageType
