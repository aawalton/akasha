import type { WorldClass } from "../../world-class.page-type.ts"

export const financierOfFortunes = {
  id: "01a0657e-1364-789c-bbb8-9539f0fb0b6f",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "financier-of-fortunes",
  title: "Financier of Fortunes",
  world: "the-wandering-inn",
  evolvesToSlugs: ["mint-lord-of-the-new-era"],
  references: "jsonl",
} as const satisfies WorldClass
