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
      statement: "The groups run 8, 4, 4, 4 and 12 hex digits, which is the one shape a uuid is written in.",
    },
    {
      invariantKind: "absence",
      statement:
        "Which version or variant a uuid carries is not judged here; `id-is-a-uuid-version-7` judges that.",
    },
  ],
} as const satisfies NameFormat
