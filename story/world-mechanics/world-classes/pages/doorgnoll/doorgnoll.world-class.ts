import type { WorldClass } from "../../world-class.page-type.ts"

export const doorgnoll = {
  id: "01a0657e-01d1-7b79-870a-d513a3411250",
  pageTypeSlug: "world-class",
  slug: "doorgnoll",
  title: "Doorgnoll",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["kingbane-lineholder", "portal-guardian", "scion-of-discontinuance"],
  references: "jsonl",
} as const satisfies WorldClass
