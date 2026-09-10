import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const subagent = {
  id: "01a05978-f2e1-78e7-9017-ab14c5c1d79b",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "subagent",
  definition: "an agent a seat runs with the Agent tool",
  pluralSlug: "subagents",
  extends: ["page-type/agent"],
  mortal: true,
  parts: ["module/subagent-presence", "relation-property/subagent-kind", "text-property/agent-id"],
  properties: [
    { pageProperty: "relation-property/principal-seat-name", required: true, many: false },
    { pageProperty: "text-property/dispatched-as", required: false, many: false },
    { pageProperty: "relation-property/subagent-kind", required: false, many: false },
    { pageProperty: "text-property/agent-id", required: true, many: false },
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
      statement: "A subagent may have fewer tools than the seat that ran that subagent.",
    },
    {
      invariantKind: "departure",
      statement: "A message to a subagent arrives at its next tool round.",
    },
    {
      invariantKind: "departure",
      statement: "A message to a subagent dies with the session that had the message.",
    },
  ],
  types: "ts",
} as const satisfies PageType
