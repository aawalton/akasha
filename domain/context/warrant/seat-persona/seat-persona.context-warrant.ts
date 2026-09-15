import type { ContextWarrant } from "akasha/domain/context/warrant/context-warrant.page-type.types.ts"

export const seatPersona = {
  id: "01a0582e-2829-7ac3-97b6-30591b0cdbde",
  type: "page-type/context-warrant",
  slug: "seat-persona",
  definition: "what a seat must read for the type every persona is held to",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat warrants the persona page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat stating no persona warrants the type all the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent speaks to nobody as a persona.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A subagent warrants no type here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona page type that cannot be found is no warrant.",
    },
  ],
} as const satisfies ContextWarrant
