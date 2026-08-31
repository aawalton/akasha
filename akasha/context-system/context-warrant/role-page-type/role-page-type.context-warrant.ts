import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const rolePageType = {
  id: "01a0582e-282a-7914-bdb9-711e7cd50c68",
  pageTypeSlug: "context-warrant",
  slug: "role-page-type",
  definition: "what a seat must read for the type of the role it states",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat warrants the type of the role it states.",
    },
    {
      invariantKind: "departure",
      statement: "A seat warrants every type that one extends.",
    },
    {
      invariantKind: "departure",
      statement: "What every role is held to stands on the type rather than on any one role.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating no role warrants no type.",
    },
    {
      invariantKind: "departure",
      statement: "A role whose page cannot be found warrants no type.",
    },
  ],
} as const satisfies ContextWarrant
