import type { Module } from "@akasha/code-system/module"

export const combatActionRefine = {
  id: "01a0617f-5834-710d-b595-a8edf56ff070",
  pageTypeSlug: "module",
  slug: "combat-action-refine",
  definition: "the tick that re-reads every tracked action and drops the finished ones",
  code: "ts",
} as const satisfies Module
