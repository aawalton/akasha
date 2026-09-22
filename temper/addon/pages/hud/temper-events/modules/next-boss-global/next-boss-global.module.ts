import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const nextBossGlobal = {
  id: "01a06157-8357-7112-8787-b5ac39b4f125",
  type: "page-type/module",
  slug: "next-boss-global",
  definition: "the name the key bindings reach this tracker's table by",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A key binding's Lua runs outside the bundle and reaches only a global.",
    },
  ],
} as const satisfies Module
