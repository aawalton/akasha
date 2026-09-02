import type { Module } from "@akasha/code-system/module"

export const libSetsKbfKeyboardFiltersIndex = {
  id: "01a0623e-53a2-70b8-a852-0cb34ae8684f",
  pageTypeSlug: "module",
  slug: "lib-sets-kbf-keyboard-filters-index",
  definition: "the ordered side-effect imports of the keyboard filter modules",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The order these modules are loaded in is the order their effects happen.",
    },
  ],
} as const satisfies Module
