import type { ContextWarrant } from "../context-warrant.page-type.types.ts"

export const seatPersona = {
  id: "01a0582e-2829-7ac3-97b6-30591b0cdbde",
  pageTypeSlug: "context-warrant",
  type: "context-warrant",
  slug: "seat-persona",
  definition: "what a seat must read for the type every persona is held to",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat warrants the persona page type.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating no persona warrants the type all the same.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent speaks to nobody as a persona.",
    },
    {
      invariantKind: "absence",
      statement: "A subagent warrants no type here.",
    },
    {
      invariantKind: "departure",
      statement: "A persona page type that cannot be found is no warrant.",
    },
  ],
} as const satisfies ContextWarrant
