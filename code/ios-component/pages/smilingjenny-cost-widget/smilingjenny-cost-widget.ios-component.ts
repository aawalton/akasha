import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const smilingjennyCostWidget = {
  id: "01a08bb4-8f4f-7297-9c23-8360a4bbe920",
  type: "page-type/ios-component",
  slug: "smilingjenny-cost-widget",
  definition: "Jenny's tile for what the block Alan is in costs him each hour",
  swift: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The ring drawn is the one the surplus tile draws rather than one of its own.",
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
    {
      decisionKind: "decision-kind/departure",
      statement: "A refused fetch tells Jenny to update the app rather than showing no signal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tap on this tile opens nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Jenny's app holds no page for the cost.",
    },
  ],
  createdAt: "2026-09-10T14:24:21.327Z",
  updatedAt: "2026-10-13T14:32:44.675Z",
} as const satisfies IosComponent
