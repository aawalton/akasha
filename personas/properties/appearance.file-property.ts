import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type Appearance = "md"

export const appearance = {
  id: "01a0658c-fbfe-7000-a50a-efaa762bf9d7",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "appearance",
  propertySlug: "appearance",
  definition: "what a persona looks like, written in her own voice",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "This property is how a persona describes herself rather than how an image of that persona was made.",
    },
    {
      invariantKind: "departure",
      statement:
        "A portrait that already describes a persona does not take the place of this property.",
    },
    {
      invariantKind: "departure",
      statement: "Two personas may look alike in their pictures.",
    },
    {
      invariantKind: "departure",
      statement: "Two personas may never sound alike in their words.",
    },
    {
      invariantKind: "upkeep",
      statement: "An appearance names the ancestry the persona's anchor image shows.",
    },
  ],
} as const satisfies FileProperty
