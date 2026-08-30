import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type LastMessagedAt = string

export const lastMessagedAt = {
  id: "01a05398-caad-7428-b9a6-ec3a8f09470c",
  pageTypeSlug: "text-property",
  slug: "last-messaged-at",
  definition: "when Alan last wrote to a persona",
  max: 24,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "This holds text because no name format stands for an instant.",
    },
  ],
} as const satisfies TextProperty
