import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { AssignmentSlug } from "../seat-system/seats/properties/assignment-slug.one-of-property.ts"
import type { PrincipalSeatName } from "../seat-system/seats/properties/principal-seat-name.relation-property.ts"
import type { Patch } from "./properties/patch.file-property.ts"

export type Agent = Page & {
  assignmentSlug: AssignmentSlug
  principalSeatName?: PrincipalSeatName
  patch?: Patch
}

export const agent = {
  id: "01a06257-7813-710a-a637-a50b6dd747d9",
  pageTypeSlug: "page-type",
  slug: "agent",
  definition: "one an agent id names, working from a seat or under one",
  pluralSlug: "agents",
  extendsSlug: "page-type/page",
  mortal: true,
  partSlugs: [
    "file-property/patch",
    "one-of-property/assignment-slug",
    "relation-property/principal-seat-name",
  ],
  properties: [
    {
      pagePropertySlug: "assignment-slug",
      required: true,
      many: false,
      default: "domain/akasha",
    },
    { pagePropertySlug: "principal-seat-name", required: false, many: false },
    { pagePropertySlug: "patch", required: false, many: false, uncommitted: true, default: "diff" },
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
      invariantKind: "departure",
      statement: "An agent drafts into one patch rather than into a patch for each change.",
    },
    {
      invariantKind: "departure",
      statement:
        "An agent works at a terminal or at a seat with no terminal or inside another agent's turn.",
    },
    {
      invariantKind: "upkeep",
      statement: "Every act an agent leaves for later has a reminder set for that act.",
    },
  ],
} as const satisfies PageType
