import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const reviewSessionNotes = {
  id: "01a06743-d160-7000-a21c-00ed7a409bee",
  type: "page-type/file-property",
  slug: "review-session-notes",
  propertySlug: "notes",
  definition: "what a persona found when she looked, in her own words",
  extensions: ["txt"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The notes are the persona's own account rather than a summary of that account.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T12:34:52.896Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies FileProperty
