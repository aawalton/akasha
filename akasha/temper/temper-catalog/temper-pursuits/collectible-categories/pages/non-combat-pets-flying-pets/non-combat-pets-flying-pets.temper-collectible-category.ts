import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const nonCombatPetsFlyingPets = {
  id: "01a06165-916a-700d-94b2-571f57c8943c",
  pageTypeSlug: "temper-collectible-category",
  slug: "non-combat-pets-flying-pets",
  title: "Flying Pets",
  parent: "non-combat-pets",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
