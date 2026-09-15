import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const targetName = {
  id: "01a059c0-5610-793f-b79a-cb8f78cf963e",
  type: "page-type/text-property",
  slug: "target-name",
  propertySlug: "target-name",
  definition: "the name Xcode builds a program under",
  maxLength: 100,
  nameFormat: null,
  unique: "unique-kind/page-type",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name a program is built under is the name the built bundle is named for.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
