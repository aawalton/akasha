import type { IosComponent } from "../../ios-component.page-type.ts"

export const alanwaltonStoplightRing = {
  id: "01a05835-69dc-706e-a604-be35e231c198",
  pageTypeSlug: "ios-component",
  type: "ios-component",
  slug: "alanwalton-stoplight-ring",
  definition: "the ring a stoplight reading is drawn on",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Whether a reading past either end of its scale draws its number is read off the reading sent.",
    },
    {
      invariantKind: "departure",
      statement: "A reading saying nothing of that draws no number past either end.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out whether a reading past either end draws its number.",
    },
    {
      invariantKind: "departure",
      statement: "An arc filling the whole ring is not drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A reading at the end of its band draws that band's own tier.",
    },
  ],
} as const satisfies IosComponent
