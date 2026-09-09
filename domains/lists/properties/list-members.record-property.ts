import type { List } from "@akasha/pages/page-property"
import type { RecordProperty } from "@akasha/pages/record-property"
import type { Definition } from "../../properties/definition.standard-agent-english-property.ts"
import type { MemberName } from "./member-name.text-property.ts"

export type Member = {
  memberName: MemberName
  definition: Definition
}

export type ListMembers = List<Member>

export const listMembers = {
  id: "01a06838-7a9e-7730-9e7f-e9d9393fe6ad",
  pageTypeSlug: "record-property",
  slug: "list-members",
  propertySlug: "members",
  definition: "the things a list's subject is a set of, each with its gloss",
  properties: [
    { pageProperty: "text-property/member-name", required: true, many: false },
    { pageProperty: "standard-agent-english-property/definition", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One list has every member of its set.",
    },
    {
      invariantKind: "departure",
      statement: "The order the members are in is the order the list means.",
    },
  ],
} as const satisfies RecordProperty
