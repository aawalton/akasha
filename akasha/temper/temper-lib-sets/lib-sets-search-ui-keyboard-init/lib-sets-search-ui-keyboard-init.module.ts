import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiKeyboardInit = {
  id: "01a0623e-53a1-77aa-a5bb-c695082dd24d",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-keyboard-init",
  definition: "what a fresh keyboard search window object is built out of",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A keystroke in a search box starts a new search 500 milliseconds later.",
    },
    {
      invariantKind: "constraint",
      statement: "The window adds itself to the game's keyboard systems under the search UI name.",
    },
  ],
} as const satisfies Module
