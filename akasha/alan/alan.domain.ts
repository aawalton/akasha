import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const alan = {
  id: "01a05dfc-d883-7000-81e2-065c3cad4cec",
  pageTypeSlug: "domain",
  slug: "alan",
  definition: "what Alan publishes under his own name",
  partSlugs: ["workspace-package/web"],
} as const satisfies Domain
