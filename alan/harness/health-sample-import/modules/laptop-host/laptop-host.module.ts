import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const laptopHost = {
  id: "01a05c14-b119-7003-ac6e-29f5219a020b",
  type: "page-type/module",
  slug: "laptop-host",
  definition: "the laptop giving health readings",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The laptop is reached at its tailnet address rather than by name.",
    },
  ],
} as const satisfies Module
