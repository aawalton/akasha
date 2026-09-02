import type { TemperDungeon } from "../temper-dungeon.page-type.ts"

export const sg = {
  id: "01a05fc5-742b-7361-a38b-010c47385b7c",
  pageTypeSlug: "temper-dungeon",
  slug: "sg",
  title: "Stone Garden",
  key: "SG",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 17,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
