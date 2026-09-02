import type { Module } from "@akasha/code-system/module"

export const submenuTimeout = {
  id: "01a0605a-5820-7660-862b-75def68c1d3b",
  pageTypeSlug: "module",
  slug: "submenu-timeout",
  definition: "the single delayed call a sub-menu opens and closes on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only one delayed call is armed at a time.",
    },
    {
      invariantKind: "departure",
      statement: "Each delayed call is registered under a name no earlier call used.",
    },
  ],
} as const satisfies Module
