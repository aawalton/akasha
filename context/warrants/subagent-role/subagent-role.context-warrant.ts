import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const subagentRole = {
  id: "01a0734f-8b0b-7000-b77c-72cd290f2287",
  pageTypeSlug: "context-warrant",
  slug: "subagent-role",
  definition: "what a subagent must read for the type every role is held to",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent warrants the role page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "The invariants and directives every role is held to are on the type rather than on any one role.",
    },
    {
      invariantKind: "absence",
      statement: "A subagent states no role, so no role of its own is warranted.",
    },
    {
      invariantKind: "departure",
      statement: "Only a subagent warrants the role page type this way.",
    },
    {
      invariantKind: "departure",
      statement: "A role page type that cannot be found is no warrant.",
    },
  ],
} as const satisfies ContextWarrant
