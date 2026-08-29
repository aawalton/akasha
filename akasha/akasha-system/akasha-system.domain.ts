import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaSystem = {
  id: "01a049e9-651c-7000-b6c1-0d4d87c8b4c5",
  pageTypeSlug: "domain",
  slug: "akasha-system",
  definition: "code, data and text in a page with a type in a file",
  partSlugs: [
    "domain/akasha-code",
    "domain/akasha-data",
    "domain/akasha-text",
    "domain/akasha-file",
    "domain/pages-system",
    "domain/domain-system",
    "domain/akasha-type",
    "domain/akasha-check",
    "domain/checks-system",
    "domain/code-system",
    "domain/data-system",
    "domain/command-system",
    "domain/akasha-migration",
  ],
  design: [
    {
      invariantKind: "departure",
      statement: "The akasha system is the `akasha` subfolder in the `akasha` repo.",
    },
    {
      invariantKind: "departure",
      statement: "Code and data are text.",
    },
    {
      invariantKind: "departure",
      statement: "Code and text are data.",
    },
    {
      invariantKind: "departure",
      statement: "Data and text are code.",
    },
  ],
} as const satisfies Domain
