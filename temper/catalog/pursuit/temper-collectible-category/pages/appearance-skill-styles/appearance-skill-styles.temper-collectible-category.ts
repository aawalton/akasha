import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const appearanceSkillStyles = {
  id: "01a06165-9165-7005-a3d4-7a19b42daa36",
  type: "page-type/temper-collectible-category",
  slug: "appearance-skill-styles",
  title: "Skill Styles",
  parent: "temper-collectible-category/appearance",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
