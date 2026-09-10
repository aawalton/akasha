import type { NamePlace } from "../name-place.page-type.types.ts"

export const typeIdentifier = {
  id: "01a04fc9-2ad6-7975-b70f-a1d56a933ee6",
  pageTypeSlug: "name-place",
  type: "name-place",
  slug: "type-identifier",
  definition: "the name a type carries in code",
  nameFormat: "name-format/upper-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A type is named for the thing the type has rather than for the file the type is in.",
    },
    {
      invariantKind: "departure",
      statement: "A type and the value of the same name are parted by their case alone.",
    },
  ],
} as const satisfies NamePlace
