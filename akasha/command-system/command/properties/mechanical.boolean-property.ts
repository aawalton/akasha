import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type Mechanical = boolean

export const mechanical = {
  id: "01a04e7f-be3c-78a3-b8f3-7153c8e9e7b6",
  pageTypeSlug: "boolean-property",
  slug: "mechanical",
  propertySlug: "mechanical",
  definition: "whether a command's changes are the machine's work rather than the caller's",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command that changes nothing states nothing here.",
    },
    {
      invariantKind: "departure",
      statement:
        "Nobody is held to reading again what a mechanical command changed until they come to write over that file itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "A read still counts after a mechanical change to what was read except for writing over that file itself.",
    },
  ],
} as const satisfies BooleanProperty
