import type { WorldClass } from "../../world-class.page-type.ts"

export const bowWardenOfTheSongbird = {
  id: "01a0657e-01c0-7088-bbe4-a260c3ec34bd",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "bow-warden-of-the-songbird",
  title: "Bow-Warden of the Songbird",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["bird-hunter"],
  evolvesToSlugs: ["bow-singer-queen-of-the-free-antinium"],
  references: "jsonl",
} as const satisfies WorldClass
