import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsSearchUiSharedXmlHandlers = {
  id: "01a0623e-53a0-7102-9ecb-77c73ed004d4",
  type: "page-type/module",
  slug: "lib-sets-search-ui-shared-xml-handlers",
  definition: "the mouse and tooltip handlers the search window's markup calls",
  code: "ts",
  decisions: [
    { decisionKind: "decision-kind/constraint", statement: "Each published name is fixed." },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Each handler picks the gamepad window or the keyboard window by the current mode.",
    },
  ],
} as const satisfies Module
