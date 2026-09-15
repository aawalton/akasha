import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentStated = {
  id: "01a0582a-d9ef-72d5-a4df-56bca58d3005",
  type: "module",
  slug: "agent-stated",
  definition: "what an agent's page states under one of its keys, as a page type and a slug",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path that is no agent's page states nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's page and a subagent's page are both an agent's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug is read from the value the page exports.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page whose body cannot be loaded states nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the page does not state answers nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug stated under a page type is answered by its last part alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page type a slug is stated under is answered on its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug stated under no page type names no page type.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
  ],
} as const satisfies Module
