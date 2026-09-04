import type { TextProperty } from "@akasha/pages-system/text-property"

export type OpsEntryFile = string

export const opsEntryFile = {
  id: "01a06904-5240-78b6-9e41-328756fa33f3",
  pageTypeSlug: "text-property",
  slug: "ops-entry-file",
  propertySlug: "ops-entry-file",
  definition: "the one file an ops command runs",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The path is read from the repository root rather than from another folder.",
    },
  ],
} as const satisfies TextProperty
