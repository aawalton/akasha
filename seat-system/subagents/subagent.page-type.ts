import type { PageType } from "@akasha/pages-system/page-type"
import type { Agent } from "../../agents/agent.page-type.ts"
import type { PrincipalSeatName } from "../seats/properties/principal-seat-name.relation-property.ts"
import type { DispatchedAs } from "../subagent-kinds/properties/dispatched-as.text-property.ts"
import type { AgentId } from "./properties/agent-id.text-property.ts"

export type Subagent = Agent & {
  principalSeatName: PrincipalSeatName
  dispatchedAs: DispatchedAs
  agentId: AgentId
}

export const subagent = {
  id: "01a05978-f2e1-78e7-9017-ab14c5c1d79b",
  pageTypeSlug: "page-type",
  slug: "subagent",
  definition: "an agent a seat runs with the Agent tool",
  pluralSlug: "subagents",
  extendsSlug: "page-type/agent",
  mortal: true,
  partSlugs: ["relation-property/subagent-kind", "text-property/agent-id"],
  properties: [
    { pagePropertySlug: "principal-seat-name", required: true, many: false },
    { pagePropertySlug: "dispatched-as", required: true, many: false },
    { pagePropertySlug: "agent-id", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent is not a seat.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's page is there while the subagent runs.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's page goes when the subagent returns.",
    },
    {
      invariantKind: "gap",
      statement: "A page for a subagent that is no longer running goes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent's slug is the name of the seat that ran the subagent and the id the subagent runs under.",
    },
    {
      invariantKind: "departure",
      statement: "The id a subagent runs under is the part of its slug after its seat's name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent's own id is minted rather than taken from the id the subagent acts under.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent states the assignment its seat states.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent states no persona.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent states no role.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent states no person.",
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
      statement: "A message to a subagent dies with the session that carried the message.",
    },
  ],
} as const satisfies PageType
