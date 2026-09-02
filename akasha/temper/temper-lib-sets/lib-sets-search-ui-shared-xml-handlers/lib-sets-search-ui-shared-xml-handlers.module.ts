import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiSharedXmlHandlers = {
  id: "01a0623e-53a0-7102-9ecb-77c73ed004d4",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-shared-xml-handlers",
  definition: "the mouse and tooltip handlers the search window's markup calls",
  code: "ts",
  invariants: [
    { invariantKind: "constraint", statement: "Each published name is fixed." },
    {
      invariantKind: "constraint",
      statement:
        "Each handler picks the gamepad window or the keyboard window by the current mode.",
    },
  ],
} as const satisfies Module
