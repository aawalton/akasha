import type { NamePlace } from "../name-place.page-type.ts"

export const packageName = {
  id: "01a04fed-2fc1-7a67-b2fe-8402f52dd5c8",
  pageTypeSlug: "name-place",
  slug: "package-name",
  definition: "the name a package is required by",
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A package name carrying no scope is one slug.",
    },
    {
      invariantKind: "departure",
      statement: "A package name carrying a scope is that scope and a slug parted by a slash.",
    },
    {
      invariantKind: "departure",
      statement: "A scope opens with an at sign.",
    },
    {
      invariantKind: "departure",
      statement: "The at sign is the registry's mark rather than a part of either name.",
    },
  ],
} as const satisfies NamePlace
