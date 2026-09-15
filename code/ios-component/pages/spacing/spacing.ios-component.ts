import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const spacing = {
  id: "01a05821-5723-78b9-b75a-3fe58bb53935",
  type: "page-type/ios-component",
  slug: "spacing",
  definition: "the steps a gap between two drawn things is allowed to be",
  swift: "swift",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every gap a tile leaves is one step among these steps.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "This Swift is written by the landing from the spacing tokens the stylesheet states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No author writes this Swift by hand.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A widget extension takes its scale from this one copy.",
    },
  ],
  parts: ["module/spacing-stepping"],
} as const satisfies IosComponent
