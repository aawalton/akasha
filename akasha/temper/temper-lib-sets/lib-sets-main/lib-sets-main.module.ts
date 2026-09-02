import type { Module } from "@akasha/code-system/module"

export const libSetsMain = {
  id: "01a0623e-53a2-76c1-87da-62ae3b18e16e",
  pageTypeSlug: "module",
  slug: "lib-sets-main",
  definition: "the add-on's single entry point",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The order these modules are loaded in is the order their effects happen.",
    },
  ],
} as const satisfies Module
