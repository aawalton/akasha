import type { List } from "@akasha/pages-system/page-property"
import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { Definition } from "../../domains/properties/definition.text-property.ts"
import type { MemberName } from "./member-name.text-property.ts"

export type Member = {
  memberName: MemberName
  definition: Definition
}

export type Members = List<Member>

export const members = {
  id: "01a06838-7a9e-7730-9e7f-e9d9393fe6ad",
  pageTypeSlug: "record-property",
  slug: "members",
  propertySlug: "members",
  definition: "the things a list's subject is a set of, each with its gloss",
  properties: [
    { pagePropertySlug: "member-name", required: true, many: false },
    { pagePropertySlug: "definition", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One list holds every member of its set.",
    },
    {
      invariantKind: "departure",
      statement: "The order the members stand in is the order the list means.",
    },
  ],
} as const satisfies RecordProperty
