import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const ring = {
  id: "01a05482-22dc-7b38-95b1-b7801f498a68",
  type: "page-type/ios-component",
  slug: "ring",
  definition: "the circle drawing a reading",
  swift: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every tile draws this one ring.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ring draws the reading the ring is handed and fetches nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A caption counts nothing down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caption is centred in its own width rather than sitting at one edge of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ring with nothing left keeps its own words.",
    },
  ],
  createdAt: "2026-08-30T21:10:09.884Z",
  updatedAt: "2026-10-13T14:50:11.528Z",
} as const satisfies IosComponent
