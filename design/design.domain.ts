import type { Domain } from "../domains/domain.page-type.types.ts"

export const design = {
  id: "01a05b55-a539-7a1c-9bdc-5a459722f028",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "design",
  definition: "how something is done well",
  parts: [
    "domain/design-patterns",
    "domain/design-primitives",
    "domain/design-system",
    "domain/design-interfaces",
  ],
  invariants: [],
  directives: [],
} as const satisfies Domain
