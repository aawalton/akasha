import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const statusBar = {
  id: "01a06811-01d3-7007-b8c1-0a172fb4f158",
  type: "page-type/domain",
  slug: "status-bar",
  definition: "what the editor shows at the bottom",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each item on the strip has its own source.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The status bar counts nothing.",
    },
  ],
} as const satisfies Domain
