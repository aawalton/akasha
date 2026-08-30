import type { NameFormat } from "../name-format.page-type.ts"

export const lowerUuid = {
  id: "01a04eba-7459-7836-ab9f-30dd5c70d710",
  pageTypeSlug: "name-format",
  slug: "lower-uuid",
  definition: "a name format joining hex groups with hyphens, all letters lower",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The one shape a uuid is written in is 8-4-4-4-12 hex digits.",
    },
    {
      invariantKind: "absence",
      statement: "Which version or variant a uuid carries is not judged here.",
    },
    {
      invariantKind: "absence",
      statement: "`id-is-a-uuid-version-7` judges that.",
    },
  ],
} as const satisfies NameFormat
