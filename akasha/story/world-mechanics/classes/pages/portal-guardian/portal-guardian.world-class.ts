import type { WorldClass } from "../../world-class.page-type.ts"

export const portalGuardian = {
  id: "01a06586-0a0a-7b3d-ba57-96a0d5459c2e",
  pageTypeSlug: "world-class",
  slug: "portal-guardian",
  title: "Portal Guardian",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["doorgnoll"],
  references: "jsonl",
} as const satisfies WorldClass
