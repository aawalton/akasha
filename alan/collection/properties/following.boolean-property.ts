import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const following = {
  id: "01a063de-2c60-700a-b99a-430529589ec1",
  type: "page-type/boolean-property",
  slug: "following",
  propertySlug: "following",
  definition: "whether a person is working through a collection as the collection arrives",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection a person follows is never finished while the collection grows.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
