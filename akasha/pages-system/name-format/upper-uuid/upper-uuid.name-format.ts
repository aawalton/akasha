import type { NameFormat } from "../name-format.page-type.ts"

export const upperUuid = {
  id: "01a04eba-7459-7c0d-8dee-2a96140424a2",
  pageTypeSlug: "name-format",
  slug: "upper-uuid",
  definition: "a name format joining hex groups with hyphens, all letters capital",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The groups run 8, 4, 4, 4 and 12 hex digits, which is the one shape a uuid is written in.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here is written in upper uuid.",
    },
    {
      invariantKind: "departure",
      statement: "A uuid is written in lower uuid.",
    },
  ],
} as const satisfies NameFormat
