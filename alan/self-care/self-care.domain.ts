import type { Domain } from "../../domains/domain.page-type.ts"

export const selfCare = {
  id: "01a065a0-140a-779c-ab0a-02df7977f480",
  pageTypeSlug: "domain",
  slug: "self-care",
  definition: "what Alan feels and how he tends it",
  partSlugs: ["domain/arousal"],
} as const satisfies Domain
