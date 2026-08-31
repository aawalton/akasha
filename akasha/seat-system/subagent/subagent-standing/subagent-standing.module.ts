import type { Module } from "../../../code-system/module/module.page-type.ts"

export const subagentStanding = {
  id: "01a0598f-18dd-77f7-94be-779f0df14af9",
  pageTypeSlug: "module",
  slug: "subagent-standing",
  definition: "a subagent's page put up while it works and taken away when it is done",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent's page is landed by a writer of its own rather than by the subagent.",
    },
    {
      invariantKind: "departure",
      statement: "A landing outlives the call that asked for it.",
    },
    {
      invariantKind: "departure",
      statement: "What a landing is refused for is read and the landing asked again.",
    },
    {
      invariantKind: "departure",
      statement: "A page states no id.",
    },
    {
      invariantKind: "departure",
      statement: "The command that lands a page mints the id it keeps.",
    },
    {
      invariantKind: "departure",
      statement: "A root is carried in the call rather than read off the code's own path.",
    },
    {
      invariantKind: "departure",
      statement: "A seat the index carries no page for writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A page states the assignment its seat states.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating no assignment writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A page already standing is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "A page that is not there is taken away by doing nothing.",
    },
  ],
} as const satisfies Module
