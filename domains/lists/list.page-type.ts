import type { PageType } from "@akasha/pages/page-type"
import type { Domain } from "akasha/domains/domain.page-type.ts"
import type { ListMembers } from "./properties/list-members.record-property.ts"

export type List = Domain & {
  members: ListMembers
}

export const list = {
  id: "01a06838-7a9d-7597-b7a6-0f752f753e26",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "list",
  definition: "a domain whose subject is a set, its members named and glossed",
  pluralSlug: "lists",
  extends: ["page-type/domain"],
  parts: ["record-property/list-members", "text-property/member-name"],
  properties: [
    {
      pageProperty: "record-property/list-members",
      required: true,
      many: true,
      maxCount: null,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A list's members are a property rather than the shape of a body.",
    },
    {
      invariantKind: "departure",
      statement: "A member is a name and a gloss.",
    },
    {
      invariantKind: "departure",
      statement: "A member has nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A member the list orders by is ordered where the members are.",
    },
    {
      invariantKind: "departure",
      statement: "A member wanting a paragraph is a page of its own.",
    },
  ],
} as const satisfies PageType
