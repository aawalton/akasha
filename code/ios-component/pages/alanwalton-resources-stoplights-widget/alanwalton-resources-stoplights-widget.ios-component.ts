import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const alanwaltonResourcesStoplightsWidget = {
  id: "01a14f45-ad97-7bea-a500-a8accd32d50c",
  type: "page-type/ios-component",
  slug: "alanwalton-resources-stoplights-widget",
  definition: "Alan's tile for the stoplight on each of his resources",
  swift: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tile draws each stoplight under the label the feed sends for it.",
    },
  ],
  createdAt: "2026-10-18T13:48:48.917Z",
  updatedAt: "2026-10-18T13:49:21.772Z",
} as const satisfies IosComponent
