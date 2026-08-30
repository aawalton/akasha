import type { NamePlace } from "../name-place.page-type.ts"

export const componentIdentifier = {
  id: "01a04fc9-2ada-7231-b57f-de98579a51d4",
  pageTypeSlug: "name-place",
  slug: "component-identifier",
  definition: "the name a view component carries in code",
  nameFormatSlug: "name-format/upper-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A component is written where a type would be read.",
    },
    {
      invariantKind: "departure",
      statement: "The file holding a component is named in lower kebab like every other file.",
    },
    {
      invariantKind: "departure",
      statement: "The file and what it holds differ on purpose.",
    },
  ],
} as const satisfies NamePlace
