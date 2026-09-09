import type { IosComponent } from "../../ios-component.page-type.ts"

export const spacing = {
  id: "01a05821-5723-78b9-b75a-3fe58bb53935",
  pageTypeSlug: "ios-component",
  type: "ios-component",
  slug: "spacing",
  definition: "the steps a gap between two drawn things is allowed to be",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every gap a tile leaves is one step among these steps.",
    },
    {
      invariantKind: "departure",
      statement:
        "This Swift is written by the landing from the spacing tokens the stylesheet states.",
    },
    {
      invariantKind: "departure",
      statement: "No author writes this Swift by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A widget extension takes its scale from this one copy.",
    },
  ],
} as const satisfies IosComponent
