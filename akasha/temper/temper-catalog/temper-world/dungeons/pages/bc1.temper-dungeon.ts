import type { TemperDungeon } from "../temper-dungeon.page-type.ts"

export const bc1 = {
  id: "01a05fc5-741f-7d68-b7c2-82023525f8ab",
  pageTypeSlug: "temper-dungeon",
  slug: "bc1",
  title: "Banished Cells I",
  key: "BC1",
  questGiver: "maj-al-ragath",
  rotationPosition: 1,
  soloDifficulty: "easy",
} as const satisfies TemperDungeon
