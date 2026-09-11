import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const reviewSessionNotes = {
  id: "01a06743-d160-7000-a21c-00ed7a409bee",
  type: "file-property",
  slug: "review-session-notes",
  propertySlug: "notes",
  definition: "what a persona found when she looked, in her own words",
  extensions: ["txt"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The notes are the persona's own account rather than a summary of that account.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
