import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const typeImport = {
  id: "01a049e9-651c-7007-8abb-675c750009bb",
  type: "page-type/domain",
  slug: "type-import",
  definition: "how a file uses code from another file",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An akasha file imports no tracked file from outside the akasha folder.",
    },
  ],
} as const satisfies Domain
