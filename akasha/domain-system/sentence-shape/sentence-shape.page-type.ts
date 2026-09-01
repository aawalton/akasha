import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Definition } from "../domain/properties/definition.text-property.ts"
import type { Allowed } from "./properties/allowed.boolean-property.ts"
import type { Reason } from "./properties/reason.text-property.ts"
import type { Rules } from "./properties/rules.text-property.ts"

export type SentenceShape = Page & {
  definition: Definition
  allowed?: Allowed
  rules: readonly Rules[]
  reason?: Reason
}

export const sentenceShape = {
  id: "01a05da1-60fc-76ca-8503-b43deb6d5f53",
  pageTypeSlug: "page-type",
  slug: "sentence-shape",
  definition: "one shape a sentence takes, and whether akasha writes in it",
  pluralSlug: "sentence-shapes",
  extendsSlug: "page-type/page",
  partSlugs: ["boolean-property/allowed", "text-property/reason", "text-property/rules"],
  properties: [
    { pagePropertySlug: "definition", required: true, many: false },
    { pagePropertySlug: "allowed", required: false, many: false },
    { pagePropertySlug: "rules", required: true, many: true, max: null },
    { pagePropertySlug: "reason", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shape akasha refuses is written down rather than left out.",
    },
    {
      invariantKind: "departure",
      statement: "The grammar parses a refused shape so a refusal can name it.",
    },
    {
      invariantKind: "departure",
      statement: "A shape akasha refuses says the fact it is refused on.",
    },
    {
      invariantKind: "departure",
      statement: "Alan decides whether akasha writes in a shape.",
    },
    {
      invariantKind: "departure",
      statement: "A shape Alan has not decided states no `allowed`.",
    },
    {
      invariantKind: "departure",
      statement: "A shape Alan has not decided is admitted until he decides it.",
    },
    {
      invariantKind: "departure",
      statement: "A shape is written down once it is parsed rather than once it is decided.",
    },
    {
      invariantKind: "absence",
      statement: "A shape says nothing about what a sentence means.",
    },
  ],
} as const satisfies PageType
