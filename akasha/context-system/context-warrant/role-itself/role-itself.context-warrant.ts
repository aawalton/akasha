import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const roleItself = {
  id: "01a0582e-2828-7d47-9e80-3f63af1f7b41",
  pageTypeSlug: "context-warrant",
  slug: "role-itself",
  definition: "what a seat must read for the role it states",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat warrants the role it states.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating no role warrants none.",
    },
    {
      invariantKind: "departure",
      statement: "A role whose page cannot be found is no warrant.",
    },
    {
      invariantKind: "departure",
      statement: "Only a seat warrants a role.",
    },
  ],
} as const satisfies ContextWarrant
