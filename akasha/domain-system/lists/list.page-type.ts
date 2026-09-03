import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Members } from "./properties/members.record-property.ts"

export type List = Domain & {
  members: Members
}

export const list = {
  id: "01a06838-7a9d-7597-b7a6-0f752f753e26",
  pageTypeSlug: "page-type",
  slug: "list",
  definition: "a domain whose subject is a set, its members named and glossed",
  pluralSlug: "lists",
  extendsSlug: "page-type/domain",
  partSlugs: ["record-property/members", "text-property/member-name"],
  properties: [{ pagePropertySlug: "members", required: true, many: true, max: null }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A list's members stand as a property rather than as the shape of a body.",
    },
    {
      invariantKind: "departure",
      statement: "A member is a name and a gloss, and carries nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A member the list orders by is ordered where the members stand.",
    },
    {
      invariantKind: "departure",
      statement: "A member that wants more than a gloss is a page of its own.",
    },
  ],
} as const satisfies PageType
