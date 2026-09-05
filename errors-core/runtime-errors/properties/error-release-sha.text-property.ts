import type { TextProperty } from "@akasha/pages-system/text-property"

export type ReleaseSha = string

export const errorReleaseSha = {
  id: "01a05f3f-e3e0-7d68-b1de-729068552c64",
  pageTypeSlug: "text-property",
  slug: "error-release-sha",
  propertySlug: "release-sha",
  definition: "the build a client was running when a client met an error",
  max: 64,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build the reporting client could not name is left out.",
    },
    {
      invariantKind: "departure",
      statement: "The build named is the one the first report carried.",
    },
  ],
} as const satisfies TextProperty
