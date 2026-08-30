import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const personaSystem = {
  id: "01a0532a-a54c-785e-97fa-4e56cb1bc0d1",
  pageTypeSlug: "domain",
  slug: "persona-system",
  definition: "who answers for a part of Alan's life, and what is kept of her",
  partSlugs: ["page-type/closeness-level", "page-type/origin-kind", "page-type/persona"],
} as const satisfies Domain
