import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const targetName = {
  id: "01a059c0-5610-793f-b79a-cb8f78cf963e",
  type: "page-type/text-property",
  slug: "target-name",
  propertySlug: "target-name",
  definition: "a program's name in Xcode",
  maxLength: 100,
  nameFormat: null,
  unique: "unique-kind/page-type",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The name a program is built under is the name the built bundle is named for.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-31T21:36:12.304Z",
  updatedAt: "2026-09-22T14:00:01.000Z",
} as const satisfies TextProperty
