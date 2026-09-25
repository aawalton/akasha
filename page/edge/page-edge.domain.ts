import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageEdge = {
  id: "01a049e9-651c-7005-9845-75ac1a5fb3a0",
  type: "page-type/domain",
  slug: "page-edge",
  definition: "an edge from a page to another page",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge is an import where the target is needed to derive this page's type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge is a slug everywhere else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every import edge is a slug property as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug edge is checked for its shape and for the page that edge names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge imports only a type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge is gone before the page runs.",
    },
  ],
} as const satisfies Domain
