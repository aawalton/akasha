import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const alanwaltonCostWidget = {
  id: "01a08bb4-3dee-7e6f-8126-950faba3221d",
  type: "page-type/ios-component",
  slug: "alanwalton-cost-widget",
  definition: "Alan's tile for what the block he is in costs him each hour",
  swift: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The ring drawn is the ring the surplus tile draws rather than a ring of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The color is read off the feed rather than worked out on the phone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cost carries no tier above and no fraction climbed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No arc is drawn for such a cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The caption is the readout's label alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The caption counts nothing down.",
    },
  ],
  createdAt: "2026-09-10T14:24:00.494Z",
  updatedAt: "2026-10-13T14:49:31.855Z",
} as const satisfies IosComponent
