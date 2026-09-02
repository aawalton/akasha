import type { TemperDungeon } from "../temper-dungeon.page-type.ts"

export const rm = {
  id: "01a05fc5-742a-763e-9712-593b8e5f602a",
  pageTypeSlug: "temper-dungeon",
  slug: "rm",
  title: "Ruins of Mazzatun",
  key: "RM",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 3,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
