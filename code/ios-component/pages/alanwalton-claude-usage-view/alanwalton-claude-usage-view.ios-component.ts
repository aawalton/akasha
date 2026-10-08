import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const alanwaltonClaudeUsageView = {
  id: "01a05835-69d9-7bdc-8a4e-5c99b08be34b",
  type: "page-type/ios-component",
  slug: "alanwalton-claude-usage-view",
  definition: "the drawing of a Claude account usage reading",
  swift: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each word drawn beside a figure is the one the feed sends for that readout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A figure sent with no words is drawn with none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A countdown's units and none-left words are the ones the feed sends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A countdown row draws nothing while the tile holds no body.",
    },
  ],
  createdAt: "2026-08-31T14:24:50.649Z",
  updatedAt: "2026-09-25T16:35:11.000Z",
} as const satisfies IosComponent
