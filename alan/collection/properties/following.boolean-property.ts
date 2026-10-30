import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const following = {
  id: "01a063de-2c60-700a-b99a-430529589ec1",
  type: "page-type/boolean-property",
  slug: "following",
  propertySlug: "following",
  definition: "whether a person works through each part of a collection when the part is published",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection a person follows is never finished while the collection grows.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T20:44:59.872Z",
  updatedAt: "2026-10-30T15:17:09.494Z",
} as const satisfies BooleanProperty
