import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const namingFolding = {
  id: "01a08e6f-55be-71c8-8946-b4047f5a9d4c",
  type: "page-type/domain",
  slug: "naming-folding",
  definition: "how a string is folded to the key that names it",
  parts: [
    "module/camelize-key",
    "module/dash-between-words",
    "module/dash-each-capital",
    "module/slug-of",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One module holds one folding rather than one module taking a flag.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A folding wrapped in a fallback or a prefix is that caller's rule rather than one here.",
    },
  ],
} as const satisfies Domain
