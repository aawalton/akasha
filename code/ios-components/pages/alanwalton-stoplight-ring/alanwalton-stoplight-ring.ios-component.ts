import type { IosComponent } from "akasha/code/ios-components/ios-component.page-type.types.ts"

export const alanwaltonStoplightRing = {
  id: "01a05835-69dc-706e-a604-be35e231c198",
  type: "ios-component",
  slug: "alanwalton-stoplight-ring",
  definition: "the ring a stoplight reading is drawn on",
  swift: "swift",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Whether a reading past either end of its scale draws its number is read off the reading sent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading saying nothing of that draws no number past either end.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out whether a reading past either end draws its number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An arc filling the whole ring is not drawn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading at the end of its band draws that band's own tier.",
    },
  ],
} as const satisfies IosComponent
