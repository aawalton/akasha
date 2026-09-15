import type { NameFormat } from "akasha/page/name-format/name-format.page-type.types.ts"

export const upperUuid = {
  id: "01a04eba-7459-7c0d-8dee-2a96140424a2",
  type: "page-type/name-format",
  slug: "upper-uuid",
  definition: "a name format joining hex groups with hyphens, all letters capital",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The one shape a uuid is written in is 8-4-4-4-12 hex digits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here is written in upper uuid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A uuid is written in lower uuid.",
    },
  ],
} as const satisfies NameFormat
