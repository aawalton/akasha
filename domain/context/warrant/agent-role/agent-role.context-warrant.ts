import type { ContextWarrant } from "akasha/domain/context/warrant/context-warrant.page-type.types.ts"

export const agentRole = {
  id: "01a0734f-8b0b-7000-b77c-72cd290f2287",
  type: "page-type/context-warrant",
  slug: "agent-role",
  definition: "what an agent must read for the type every role is held to",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent warrants the role page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The decisions and directives every role is held to are on the type rather than on any one role.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent stating no role of its own warrants the type all the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an agent warrants the role page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A role page type that cannot be found is no warrant.",
    },
  ],
} as const satisfies ContextWarrant
