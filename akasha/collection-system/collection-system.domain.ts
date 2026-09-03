import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const collectionSystem = {
  id: "01a063de-2c60-7005-8e4e-6c1a17240b50",
  pageTypeSlug: "domain",
  slug: "collection-system",
  definition: "how we keep track of collections of things for a person to experience",
  partSlugs: [
    "page-type/collection-type",
    "page-type/collection",
    "page-type/collection-external",
    "page-type/sync",
    "page-type/sync-run",
    "workspace-package/great-courses",
    "workspace-package/royal-road",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A book and a course and an album are each one collection.",
    },
    {
      invariantKind: "departure",
      statement: "What a collection holds is collections too.",
    },
  ],
} as const satisfies Domain
