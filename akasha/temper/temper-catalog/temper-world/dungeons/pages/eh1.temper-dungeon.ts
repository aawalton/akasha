import type { TemperDungeon } from "../temper-dungeon.page-type.ts"

export const eh1 = {
  id: "01a05fc5-7425-7aaa-9002-acff9466856c",
  pageTypeSlug: "temper-dungeon",
  slug: "eh1",
  title: "Elden Hollow I",
  key: "EH1",
  questGiver: "maj-al-ragath",
  rotationPosition: 5,
  soloDifficulty: "easy",
} as const satisfies TemperDungeon
