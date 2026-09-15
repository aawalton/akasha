import type { ContextWarrant } from "akasha/domain/context/warrant/context-warrant.page-type.types.ts"

export const roleItself = {
  id: "01a0582e-2828-7d47-9e80-3f63af1f7b41",
  type: "page-type/context-warrant",
  slug: "role-itself",
  definition: "what a seat must read for the role it states",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat warrants the role the seat states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat stating no role warrants no role.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A role whose page cannot be found is no warrant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a seat warrants a role.",
    },
  ],
} as const satisfies ContextWarrant
