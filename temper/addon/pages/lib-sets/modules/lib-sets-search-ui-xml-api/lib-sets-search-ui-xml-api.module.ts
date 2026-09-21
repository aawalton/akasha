import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsSearchUiXmlApi = {
  id: "01a0623e-53a0-708b-a8c0-947cba1427e9",
  type: "page-type/module",
  slug: "lib-sets-search-ui-xml-api",
  definition: "the width a control takes from the width of the window with it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The markup reaches XMLGetDynamicWidth on the library global.",
    },
  ],
} as const satisfies Module
