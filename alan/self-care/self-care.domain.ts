import type { Domain } from "../../domains/domain.page-type.types.ts"

export const selfCare = {
  id: "01a065a0-140a-779c-ab0a-02df7977f480",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "self-care",
  definition: "what Alan feels and how he tends it",
  parts: ["domain/arousal"],
} as const satisfies Domain
