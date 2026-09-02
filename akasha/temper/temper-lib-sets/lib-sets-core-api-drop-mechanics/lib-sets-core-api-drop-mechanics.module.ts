import type { Module } from "@akasha/code-system/module"

export const libSetsCoreApiDropMechanics = {
  id: "01a06231-8f1c-7ec0-9f99-9b6132b3a27b",
  pageTypeSlug: "module",
  slug: "lib-sets-core-api-drop-mechanics",
  definition: "how a set drops, named and described in the caller's language",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The same function is published under an upper-case and a lower-case first letter.",
    },
  ],
} as const satisfies Module
