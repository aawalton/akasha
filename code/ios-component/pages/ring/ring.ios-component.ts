import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const ring = {
  id: "01a05482-22dc-7b38-95b1-b7801f498a68",
  type: "ios-component",
  slug: "ring",
  definition: "the circle a reading is drawn on",
  swift: "swift",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every tile draws this one ring.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ring draws the reading the ring is handed and fetches nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caption handed a moment counts down to that moment in place of its words.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caption counting down is left to redraw itself rather than spelled as text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caption counting down is written in the form the caption names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caption is centred in its own width rather than sitting at one edge of it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ring with nothing left keeps its own words rather than counting.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A moment already gone is counted up from rather than held at nothing.",
    },
  ],
} as const satisfies IosComponent
