import type { Module } from "../../code-system/modules/module.page-type.ts"

export const iosWidgetSwift = {
  id: "01a069f1-8def-782f-8923-20e7141bb2df",
  pageTypeSlug: "module",
  slug: "ios-widget-swift",
  definition: "the Swift a widget page states, composed from the page alone",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A widget draws only what its own page names.",
    },
    {
      invariantKind: "gap",
      statement: "A resolved widget carrying no reading is returned unrefused.",
    },
    {
      invariantKind: "departure",
      statement: "The widget page is read from the akasha index.",
    },
    {
      invariantKind: "departure",
      statement: "The readouts of every named group are read from the akasha index.",
    },
    {
      invariantKind: "departure",
      statement: "Where the Swift is written is taken from the folder the app page sits in.",
    },
  ],
} as const satisfies Module
