import type { TextProperty } from "@akasha/pages/text-property"

export type LastMessagedAt = string

export const lastMessagedAt = {
  id: "01a05398-caad-7428-b9a6-ec3a8f09470c",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "last-messaged-at",
  propertySlug: "last-messaged-at",
  definition: "when Alan last wrote to a persona",
  maxLength: 24,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "No name format exists for an instant.",
    },
  ],
} as const satisfies TextProperty
