import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const propertyFile = {
  id: "01a08ed6-90b4-7819-b4f7-32222a7f7c69",
  type: "module",
  slug: "property-file",
  definition: "the file a page holds a property in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A property a page type files under a name of its own is that name beside the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "Any other property is under the name the page's own value states beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A page type holding that property in no file is refused rather than answered.",
    },
  ],
} as const satisfies Module
