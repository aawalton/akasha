import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const selfCare = {
  id: "01a065a0-140a-779c-ab0a-02df7977f480",
  type: "page-type/domain",
  slug: "self-care",
  definition: "how Alan cares for himself",
  parts: ["domain/arousal"],
} as const satisfies Domain
