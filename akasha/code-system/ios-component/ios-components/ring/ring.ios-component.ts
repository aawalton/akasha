import type { IosComponent } from "../../ios-component.page-type.ts"

export const ring = {
  id: "01a05482-22dc-7b38-95b1-b7801f498a68",
  pageTypeSlug: "ios-component",
  slug: "ring",
  definition: "the circle a reading is drawn on",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every tile draws this one ring.",
    },
    {
      invariantKind: "departure",
      statement: "A ring draws what it is handed and fetches nothing.",
    },
  ],
} as const satisfies IosComponent
