import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const alan = {
  id: "01a05dfc-d883-7000-81e2-065c3cad4cec",
  pageTypeSlug: "domain",
  slug: "alan",
  definition: "what belongs to Alan himself",
  partSlugs: [
    "domain/alan-harness",
    "domain/authoring",
    "domain/car-research",
    "domain/fitness",
    "domain/library",
    "domain/music",
    "domain/relating",
    "domain/self",
    "domain/scripture-study",
    "domain/self-care",
    "domain/style",
    "domain/tracking",
    "router-app/alan-atlas-web",
    "router-app/alan-web",
    "router-app/alan-web-capacitor",
    "workspace-package/chess",
  ],
} as const satisfies Domain
