import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const lenient = {
  id: "01a08e05-c68f-74b6-8b47-cc4af35bbb1b",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "lenient",
  propertySlug: "lenient",
  definition: "whether a command may fail without the service running that command failing",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command saying nothing here fails the service running that command.",
    },
    {
      invariantKind: "departure",
      statement: "A command saying true here opens with a dash in the unit.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
