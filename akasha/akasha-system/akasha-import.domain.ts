import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaImport = {
  id: "01a049e9-651c-7007-8abb-675c750009bb",
  slug: "akasha-import",
  definition: "one file using what another declares",
  condition: [
    "An akasha file imports nothing outside the akasha folder.",
  ],
} as const satisfies Domain
