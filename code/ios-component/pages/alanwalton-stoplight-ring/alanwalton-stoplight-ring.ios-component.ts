import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const alanwaltonStoplightRing = {
  id: "01a05835-69dc-706e-a604-be35e231c198",
  type: "page-type/ios-component",
  slug: "alanwalton-stoplight-ring",
  definition: "a stoplight reading's ring",
  swift: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether a reading past either end of its scale draws its number is read off the reading sent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading saying nothing of that draws no number past either end.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out whether a reading past either end draws its number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An arc filling the whole ring is not drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading at the end of its band draws that band's own tier.",
    },
  ],
} as const satisfies IosComponent
