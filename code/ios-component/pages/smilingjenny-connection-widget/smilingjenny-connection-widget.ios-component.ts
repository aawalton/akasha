import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const smilingjennyConnectionWidget = {
  id: "01a1358f-67b1-771e-81fc-b39b562f4eb7",
  type: "page-type/ios-component",
  slug: "smilingjenny-connection-widget",
  definition: "Jenny's tile for Alan's connection with her",
  swift: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The ring drawn is the one Jenny's safety tile draws rather than one of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The payload is decoded as the shape the safety tile decodes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refused fetch tells Jenny to update the app rather than showing no signal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tap on this tile opens nothing.",
    },
  ],
  createdAt: "2026-10-13T13:59:13.071Z",
  updatedAt: "2026-10-13T13:59:13.071Z",
} as const satisfies IosComponent
