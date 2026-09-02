import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { AssignmentSlug } from "../../seat-system/seat/properties/assignment-slug.text-property.ts"
import type { PrincipalSeatName } from "../../seat-system/seat/properties/principal-seat-name.relation-property.ts"

export type Agent = Page & {
  assignmentSlug: AssignmentSlug
  principalSeatName?: PrincipalSeatName
}

export const agent = {
  id: "01a06257-7813-710a-a637-a50b6dd747d9",
  pageTypeSlug: "page-type",
  slug: "agent",
  definition: "one an agent id names, working from a seat or under one",
  pluralSlug: "agents",
  extendsSlug: "page-type/page",
  mortal: true,
  partSlugs: ["relation-property/principal-seat-name", "text-property/assignment-slug"],
  properties: [
    {
      pagePropertySlug: "assignment-slug",
      required: true,
      many: false,
      default: "domain/akasha-system",
    },
    { pagePropertySlug: "principal-seat-name", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An agent is named by one agent id wherever the agent acts.",
    },
    {
      invariantKind: "departure",
      statement: "An agent id names a seat.",
    },
    {
      invariantKind: "departure",
      statement: "An agent id names a subagent by its seat's id and its own.",
    },
    {
      invariantKind: "departure",
      statement: "What an agent has read is the agent's own rather than its seat's.",
    },
    {
      invariantKind: "departure",
      statement: "An agent answers for the assignment the agent states.",
    },
    {
      invariantKind: "gap",
      statement: "An agent states the agent id the agent acts under.",
    },
  ],
} as const satisfies PageType
