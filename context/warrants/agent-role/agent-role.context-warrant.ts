import type { ContextWarrant } from "../context-warrant.page-type.ts"

export const agentRole = {
  id: "01a0734f-8b0b-7000-b77c-72cd290f2287",
  pageTypeSlug: "context-warrant",
  type: "context-warrant",
  slug: "agent-role",
  definition: "what an agent must read for the type every role is held to",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An agent warrants the role page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "The invariants and directives every role is held to are on the type rather than on any one role.",
    },
    {
      invariantKind: "departure",
      statement: "An agent stating no role of its own warrants the type all the same.",
    },
    {
      invariantKind: "departure",
      statement: "Only an agent warrants the role page type.",
    },
    {
      invariantKind: "departure",
      statement: "A role page type that cannot be found is no warrant.",
    },
  ],
} as const satisfies ContextWarrant
