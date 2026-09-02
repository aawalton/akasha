import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const alan = {
  id: "01a05dfc-d883-7000-81e2-065c3cad4cec",
  pageTypeSlug: "domain",
  slug: "alan",
  definition: "what belongs to Alan himself",
  partSlugs: [
    "domain/alan-harness",
    "page-type/daily-tracking",
    "page-type/eso-daily-tracking",
    "workspace-package/alan-web",
  ],
} as const satisfies Domain
