import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const multiSelectProperty = {
  id: "01a05b92-a9c7-73ad-b512-5bf6b844a357",
  type: "page-type/module",
  slug: "multi-select-property",
  definition: "the operations implementing the multi-select property type",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The options a property declares are read here rather than by each reader.",
    },
  ],
  createdAt: "2026-09-01T06:05:33.511Z",
  updatedAt: "2026-09-15T18:35:14.000Z",
} as const satisfies Module
