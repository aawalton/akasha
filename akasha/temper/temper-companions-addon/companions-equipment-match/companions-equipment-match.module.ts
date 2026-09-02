import type { Module } from "@akasha/code-system/module"

export const companionsEquipmentMatch = {
  id: "01a0611d-84d5-7bd2-a667-02cb3cf8945b",
  pageTypeSlug: "module",
  slug: "companions-equipment-match",
  definition: "how far a companion's worn gear is from the build a player is aiming at",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each gear slot is judged on weight and on trait and on quality apart.",
    },
  ],
} as const satisfies Module
