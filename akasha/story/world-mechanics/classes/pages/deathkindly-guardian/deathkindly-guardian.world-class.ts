import type { WorldClass } from "../../world-class.page-type.ts"

export const deathkindlyGuardian = {
  id: "01a0657e-01cf-7dd1-ae5c-fb85eb959c92",
  pageTypeSlug: "world-class",
  slug: "deathkindly-guardian",
  title: "Deathkindly Guardian",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["skeleton-knight"],
  references: "jsonl",
} as const satisfies WorldClass
