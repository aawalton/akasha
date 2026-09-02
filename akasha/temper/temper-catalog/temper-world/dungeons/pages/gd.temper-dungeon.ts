import type { TemperDungeon } from "../temper-dungeon.page-type.ts"

export const gd = {
  id: "01a05fc5-7428-74d0-8c81-c70eb165f8f9",
  pageTypeSlug: "temper-dungeon",
  slug: "gd",
  title: "Graven Deep",
  key: "GD",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 25,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
