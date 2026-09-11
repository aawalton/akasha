import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const design = {
  id: "01a05b55-a539-7a1c-9bdc-5a459722f028",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "design",
  definition: "how something is done well",
  parts: ["domain/design-interfaces", "domain/design-games", "domain/image"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A design package reads the router through a context rather than importing the router.",
    },
  ],
  directives: [],
} as const satisfies Domain
