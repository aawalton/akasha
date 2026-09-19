import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const featureRequest = {
  id: "01a0b79b-96bb-779c-bc1e-65ffdce6bfe0",
  type: "page-type/domain",
  slug: "feature-request",
  definition: "something a contributor asks Alan to build",
} as const satisfies Domain
