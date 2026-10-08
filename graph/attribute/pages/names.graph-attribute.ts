import type { GraphAttribute } from "akasha/graph/attribute/graph-attribute.page-type.types.ts"

export type Names = "type" | "code"

export const names = {
  id: "01a0a657-ee99-79ce-80ca-38525c881a53",
  type: "page-type/graph-attribute",
  slug: "names",
  definition: "whether an edge names a type or names code",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge naming a type is taken away before anything runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge naming code is loaded, however late that loading happens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge coming in says what that edge names.",
    },
  ],
  createdAt: "2026-09-15T18:32:55.705Z",
  updatedAt: "2026-09-24T22:53:20.000Z",
} as const satisfies GraphAttribute
