import type { IosComponent } from "../../ios-component.page-type.ts"

export const alanwaltonStoplightRing = {
  id: "01a05835-69dc-706e-a604-be35e231c198",
  pageTypeSlug: "ios-component",
  slug: "alanwalton-stoplight-ring",
  definition: "the ring a stoplight reading is drawn on",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading past either end of its scale draws no number.",
    },
    {
      invariantKind: "departure",
      statement: "The tile drawing one reading alone draws that number, which this one does not.",
    },
  ],
} as const satisfies IosComponent
