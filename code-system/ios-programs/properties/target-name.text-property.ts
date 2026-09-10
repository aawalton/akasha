import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type TargetName = string

export const targetName = {
  id: "01a059c0-5610-793f-b79a-cb8f78cf963e",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "target-name",
  propertySlug: "target-name",
  definition: "the name Xcode builds a program under",
  maxLength: 100,
  nameFormat: null,
  unique: "page-type",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The name a program is built under is the name the built bundle is named for.",
    },
  ],
} as const satisfies TextProperty
