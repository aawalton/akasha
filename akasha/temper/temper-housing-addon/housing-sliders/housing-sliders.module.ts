import type { Module } from "@akasha/code-system/module"

export const housingSliders = {
  id: "01a06128-d5d3-7266-b58c-be10d8a99596",
  pageTypeSlug: "module",
  slug: "housing-sliders",
  definition: "scrolling a housing list by its slider and by the mouse wheel",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A list shorter than the frame holding the list hides the slider.",
    },
  ],
} as const satisfies Module
