import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { PrincipalSeatName } from "../seat/properties/principal-seat-name.relation-property.ts"
import type { DispatchedAs } from "./properties/dispatched-as.text-property.ts"

export type Subagent = Page & {
  principalSeatName: PrincipalSeatName
  dispatchedAs: DispatchedAs
}

export const subagent = {
  id: "01a05978-f2e1-78e7-9017-ab14c5c1d79b",
  pageTypeSlug: "page-type",
  slug: "subagent",
  definition: "an agent a seat runs with the Agent tool",
  pluralSlug: "subagents",
  extendsSlug: "page-type/page",
  mortal: true,
  partSlugs: ["text-property/dispatched-as"],
  properties: [
    { pagePropertySlug: "principal-seat-name", required: true, many: false },
    { pagePropertySlug: "dispatched-as", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent is not a seat.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's page stands while it runs.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's page goes when it returns.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's slug is the name of the seat that ran it and the id it runs under.",
    },
    {
      invariantKind: "departure",
      statement: "The id a subagent runs under is the part of its slug after its seat's name.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent states no attribute the seat that ran it states.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent may carry fewer tools than the seat that ran it.",
    },
    {
      invariantKind: "departure",
      statement: "A message to a subagent arrives at its next tool round.",
    },
    {
      invariantKind: "departure",
      statement: "A message to a subagent dies with the session that carried it.",
    },
  ],
} as const satisfies PageType
