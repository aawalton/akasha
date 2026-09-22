import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiSharedClass = {
  id: "01a0623c-2df8-793e-9947-dbed82a8c7c5",
  type: "page-type/module",
  slug: "sets-search-ui-shared-class",
  definition: "the class giving both search windows their shared behaviour",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The parent methods are handed out as a second plainly typed view of the class.",
    },
  ],
} as const satisfies Module
