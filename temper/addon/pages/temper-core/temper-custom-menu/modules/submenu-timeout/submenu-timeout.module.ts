import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const submenuTimeout = {
  id: "01a0605a-5820-7660-862b-75def68c1d3b",
  type: "page-type/module",
  slug: "submenu-timeout",
  definition: "the single delayed call a sub-menu opens and closes on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only one delayed call is armed at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each delayed call is registered under a name no earlier call used.",
    },
  ],
} as const satisfies Module
