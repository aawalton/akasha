import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const issues = {
  id: "01a10324-8b4d-79c7-bb41-b8d11fc48914",
  type: "page-type/file-property",
  slug: "issues",
  propertySlug: "issues",
  definition: "the faults the reviewers found in a turn or written chapter, one to a line",
  extensions: ["txt"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line is one issue, of at most 100 characters, and a file holds at most 100.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An issue quotes the beat it faults.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master repairs the beats each issue faults.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Issues sit beside the page, so a full chapter's never push it over its ceiling.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
