import type { BooleanProperty } from "../../../pages-system/page-property/boolean-property.page-type.ts"

export type Mechanical = boolean

export const mechanical = {
  id: "01a04e7f-be3c-78a3-b8f3-7153c8e9e7b6",
  pageTypeSlug: "boolean-property",
  slug: "mechanical",
  definition: "whether a command's changes are the machine's work rather than the caller's",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command that changes nothing states nothing here.",
    },
    {
      invariantKind: "gap",
      statement: "Nobody is held to having read what a mechanical command changes.",
    },
    {
      invariantKind: "gap",
      statement: "A read still counts after a mechanical change to what was read.",
    },
  ],
} as const satisfies BooleanProperty
