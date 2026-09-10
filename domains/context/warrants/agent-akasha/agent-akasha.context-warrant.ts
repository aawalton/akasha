import type { ContextWarrant } from "../context-warrant.page-type.types.ts"

export const agentAkasha = {
  id: "01a07342-4f26-7000-a08d-68ea33c583d6",
  pageTypeSlug: "context-warrant",
  type: "context-warrant",
  slug: "agent-akasha",
  definition: "what an agent must read for the akasha domain it works within",
  code: "ts",
  test: "ts",
  runsOnRead: true,
  runsOnWrite: true,
  transitive: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An agent warrants the akasha domain.",
    },
    {
      invariantKind: "departure",
      statement: "Only an agent warrants the akasha domain.",
    },
    {
      invariantKind: "departure",
      statement: "An akasha domain whose page cannot be found is no warrant.",
    },
  ],
} as const satisfies ContextWarrant
