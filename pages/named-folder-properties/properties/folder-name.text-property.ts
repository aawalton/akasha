import type { TextProperty } from "../../text-properties/text-property.page-type.types.ts"

export type FolderName = string

export const folderName = {
  id: "01a081cc-3144-7cd7-8de6-3cc3911adc06",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "folder-name",
  propertySlug: "folder-name",
  definition: "the name a property's folder is under",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This folder name is the whole name rather than a stem.",
    },
  ],
} as const satisfies TextProperty
