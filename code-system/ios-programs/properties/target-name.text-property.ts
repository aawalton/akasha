import type { TextProperty } from "@akasha/pages-system/text-property"

export type TargetName = string

export const targetName = {
  id: "01a059c0-5610-793f-b79a-cb8f78cf963e",
  pageTypeSlug: "text-property",
  slug: "target-name",
  propertySlug: "target-name",
  definition: "the name Xcode builds a program under",
  max: 100,
  nameFormatSlug: null,
  unique: "page-type",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What a program is built under is what the built bundle is named for.",
    },
  ],
} as const satisfies TextProperty
