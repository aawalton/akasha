import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const multiSelectProperty = {
  id: "01a05b92-a9c7-73ad-b512-5bf6b844a357",
  type: "module",
  slug: "multi-select-property",
  definition: "the operations implementing the multi-select property type",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The options a property declares are read here rather than by each reader.",
    },
  ],
} as const satisfies Module
