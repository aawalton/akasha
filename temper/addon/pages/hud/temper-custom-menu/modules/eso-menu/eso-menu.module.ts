import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoMenu = {
  id: "01a0605a-581e-7142-806e-c83e2c7a8fe8",
  type: "page-type/module",
  slug: "eso-menu",
  definition: "the game's own context menu control",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One control has every context menu the game shows.",
    },
  ],
} as const satisfies Module
