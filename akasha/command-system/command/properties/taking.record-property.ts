import type { List } from "../../../pages-system/page-property/page-property.page-type.ts"
import type { RecordProperty } from "../../../pages-system/record-property/record-property.page-type.ts"
import type { Said } from "./said.text-property.ts"
import type { Takes } from "./takes.text-property.ts"

export type Take = {
  said: Said
  takes: Takes
}

export type Taking = List<Take>

export const taking = {
  id: "01a05027-c468-74f9-99df-98fc7bd0c372",
  pageTypeSlug: "record-property",
  slug: "taking",
  propertySlug: "taking",
  definition: "what a command takes on the command line, each with what it is for",
  properties: [
    { pagePropertySlug: "said", required: true, many: false },
    { pagePropertySlug: "takes", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The entries stand in the order they are shown.",
    },
    {
      invariantKind: "departure",
      statement: "That order is read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command stating nothing here is handed the help flag and answers for itself instead.",
    },
    {
      invariantKind: "departure",
      statement: "What a command takes is stated on its page.",
    },
    {
      invariantKind: "departure",
      statement: "Its code states only how what was said is worked out.",
    },
  ],
} as const satisfies RecordProperty
