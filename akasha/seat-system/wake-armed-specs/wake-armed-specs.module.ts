import type { Module } from "@akasha/code-system/module"

export const wakeArmedSpecs = {
  id: "01a0695a-d2ea-7f65-af9d-c2744d0e96c8",
  pageTypeSlug: "module",
  slug: "wake-armed-specs",
  definition:
    "the rules deciding which messages rouse a persona or handler seat, and the shape they take",
  code: "ts",
} as const satisfies Module
