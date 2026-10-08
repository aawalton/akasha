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
  createdAt: "2026-09-02T04:22:08.670Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
