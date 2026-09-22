import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuUtilArrowColor = {
  id: "01a0c50c-bd87-7ae7-8703-f8f255e02fe4",
  type: "page-type/module",
  slug: "scrollable-menu-util-arrow-color",
  definition: "the color the arrow on a submenu entry is drawn in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The arrow tint is chosen from whether a nested entry is selected.",
    },
  ],
} as const satisfies Module
