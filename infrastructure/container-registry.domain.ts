import type { Domain } from "../domains/domains/domain.page-type.ts"

export const containerRegistry = {
  id: "01a0658b-0f02-7e11-9293-61be7a832920",
  pageTypeSlug: "domain",
  slug: "container-registry",
  definition: "the store container images live in",
  pluralSlug: "container-registries",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The registry serves plain HTTP.",
    },
    {
      invariantKind: "constraint",
      statement: "A node cannot resolve names inside the cluster.",
    },
    {
      invariantKind: "departure",
      statement: "A node reaches the registry at an address rather than by name.",
    },
    {
      invariantKind: "departure",
      statement: "Only the newest images of each family are kept.",
    },
    {
      invariantKind: "departure",
      statement: "Every older image of a family is deleted.",
    },
  ],
} as const satisfies Domain
