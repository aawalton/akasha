import type { Module } from "@akasha/code/module"

export const changeCosting = {
  id: "01a080c6-8416-7379-b588-57f7c3f59557",
  pageTypeSlug: "module",
  slug: "change-costing",
  definition: "what one run of a change or an apply cost, appended beside that command's page",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run's cost is appended beside the page of the command that ran.",
    },
    {
      invariantKind: "departure",
      statement: "A line states what ran and which of the two the run was.",
    },
    {
      invariantKind: "departure",
      statement: "A change run and the apply following that change run are two runs.",
    },
    {
      invariantKind: "departure",
      statement: "A run id is minted for each run rather than shared between two runs.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here measures, as one module measures what a run cost.",
    },
    {
      invariantKind: "absence",
      statement: "A disk that refuses a line leaves the run's answer alone.",
    },
  ],
} as const satisfies Module
