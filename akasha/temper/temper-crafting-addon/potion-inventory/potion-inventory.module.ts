import type { Module } from "@akasha/code-system/module"

export const potionInventory = {
  id: "01a061c7-e87f-702b-9dc2-9232a71a77ba",
  pageTypeSlug: "module",
  slug: "potion-inventory",
  definition: "the reagents and solvents the player is carrying",
  code: "ts",
} as const satisfies Module
