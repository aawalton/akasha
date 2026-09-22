import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const propertyFile = {
  id: "01a08ed6-90b4-7819-b4f7-32222a7f7c69",
  type: "page-type/module",
  slug: "property-file",
  definition: "the file holding a page's property",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A property a page type files under a name of its own is that name beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Any other property is under the name the page's own value states beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type holding that property in no file is refused rather than answered.",
    },
  ],
} as const satisfies Module
