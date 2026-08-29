import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaImport = {
  id: "01a049e9-651c-7007-8abb-675c750009bb",
  pageTypeSlug: "domain",
  slug: "akasha-import",
  definition: "one file using what another declares",
  requiredReadingSlugs: [],
  design: [
    {
      invariantKind: "departure",
      statement:
        "What akasha needs from outside arrives as one value, including the name it was invoked by.",
    },
    {
      invariantKind: "departure",
      statement: "An akasha file imports no tracked file from outside the akasha folder.",
    },
  ],
} as const satisfies Domain
