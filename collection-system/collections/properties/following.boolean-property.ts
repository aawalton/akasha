import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Following = boolean

export const following = {
  id: "01a063de-2c60-700a-b99a-430529589ec1",
  pageTypeSlug: "boolean-property",
  slug: "following",
  propertySlug: "following",
  definition: "whether a person is working through a collection as the collection arrives",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A collection a person follows is never finished while the collection grows.",
    },
  ],
} as const satisfies BooleanProperty
