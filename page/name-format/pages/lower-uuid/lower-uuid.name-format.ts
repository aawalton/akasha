import type { NameFormat } from "akasha/page/name-format/name-format.page-type.types.ts"

export const lowerUuid = {
  id: "01a04eba-7459-7836-ab9f-30dd5c70d710",
  type: "page-type/name-format",
  slug: "lower-uuid",
  definition: "a name format joining hex groups with hyphens, all letters lower",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The one shape a uuid is written in is 8-4-4-4-12 hex digits.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Which version or variant a uuid has is not judged here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "`id-is-a-uuid-version-7` judges which version or variant a uuid has.",
    },
  ],
} as const satisfies NameFormat
