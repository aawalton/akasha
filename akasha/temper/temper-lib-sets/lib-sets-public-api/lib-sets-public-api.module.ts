import type { Module } from "@akasha/code-system/module"

export const libSetsPublicApi = {
  id: "01a0623e-53a2-7b73-9549-80f57a6b383c",
  pageTypeSlug: "module",
  slug: "lib-sets-public-api",
  definition: "the ordered load list of this library's modules",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The order these modules are loaded in is the order their effects happen.",
    },
  ],
} as const satisfies Module
