import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaImport = {
  id: "01a049e9-651c-7007-8abb-675c750009bb",
  pageTypeSlug: "domain",
  slug: "akasha-import",
  definition: "one file using what another declares",
  design: [
    "What akasha needs from outside arrives as one value, including the name it was invoked by.",
  ],
} as const satisfies Domain
