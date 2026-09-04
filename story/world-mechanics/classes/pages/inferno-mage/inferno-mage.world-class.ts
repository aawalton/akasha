import type { WorldClass } from "../../world-class.page-type.ts"

export const infernoMage = {
  id: "01a0657e-1376-7bb3-9d8d-a04b7c6f5857",
  pageTypeSlug: "world-class",
  slug: "inferno-mage",
  title: "Inferno Mage",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["fire-mage"],
  references: "jsonl",
} as const satisfies WorldClass
