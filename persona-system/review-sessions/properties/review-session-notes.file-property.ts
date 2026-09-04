import type { FileProperty } from "@akasha/pages-system/file-property"

export type ReviewSessionNotes = "txt"

export const reviewSessionNotes = {
  id: "01a06743-d160-7000-a21c-00ed7a409bee",
  pageTypeSlug: "file-property",
  slug: "review-session-notes",
  propertySlug: "notes",
  definition: "what a persona found when she looked, in her own words",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The notes are the persona's own account rather than a summary of one.",
    },
  ],
} as const satisfies FileProperty
