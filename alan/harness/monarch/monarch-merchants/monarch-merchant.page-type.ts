import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { MerchantPatterns } from "./properties/merchant-patterns.text-property.ts"

export type MonarchMerchant = Page & {
  title: Title
  merchantPatterns: readonly MerchantPatterns[]
}

export const monarchMerchant = {
  id: "01a0680c-3c00-700b-a937-4d1f6c8b310c",
  pageTypeSlug: "page-type",
  slug: "monarch-merchant",
  definition: "who or what a transaction was with, read out of the words it carries",
  pluralSlug: "monarch-merchants",
  extendsSlug: ["page-type/page"],
  partSlugs: ["text-property/merchant-patterns"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "merchant-patterns", required: true, many: true, max: 20 },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "How the money moved is a merchant here, for rows whose words name no vendor.",
    },
    {
      invariantKind: "departure",
      statement: "A merchant a rule names is a merchant standing here.",
    },
    {
      invariantKind: "departure",
      statement: "A row matching no merchant is read as `unstated`.",
    },
  ],
  directives: [
    {
      directiveKind: "principle",
      name: "The Words That Survive",
      act: "Take a merchant's patterns from the bank's own text rather than from Monarch's title.",
      warrant:
        "A title is Monarch's rewrite of the bank's line and changes without warning; the line never does.",
      aids: [
        "Never add the title as an extra pattern.",
        "Copy the run exactly, abbreviations and all.",
      ],
    },
  ],
} as const satisfies PageType
