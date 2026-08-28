import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaSystem = {
  id: "01a049e9-651c-7000-b6c1-0d4d87c8b4c5",
  slug: "akasha-system",
  definition: "code, data and text in a page with a type in a file",
  partSlugs: [
    "akasha-code",
    "akasha-data",
    "akasha-text",
    "akasha-file",
    "page",
    "akasha-type",
    "akasha-check",
    "akasha-migration",
  ],
  requiredReadingSlugs: [
    "akasha-check",
    "akasha-code",
    "akasha-data",
    "akasha-file",
    "akasha-migration",
    "page",
    "akasha-text",
    "akasha-type",
  ],
  design: [
    "The akasha system is the `akasha` subfolder in the `akasha` repo.",
    "Code and data are text.",
    "Code and text are data.",
    "Data and text are code.",
  ],
} as const satisfies Domain
