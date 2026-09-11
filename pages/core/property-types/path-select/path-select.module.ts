import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const pathSelect = {
  id: "01a05b92-a9c7-754f-841a-7b3154e215d2",
  type: "module",
  slug: "path-select",
  definition: "a property value treated as a path of ordered segments",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A property value read as a path of segments is read here rather than by each reader.",
    },
  ],
} as const satisfies Module
