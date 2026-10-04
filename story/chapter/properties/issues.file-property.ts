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
      statement:
        "One line is one issue, of at most 100 characters past its slug, and a chapter's file at most 100.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An issue quotes the beat it faults.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each line opens on the slug of the reviewer that raised it and a colon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reviewer's review replaces the lines it raised before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file goes once no line is left in it, and as the turn reaches player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master repairs the beats each issue faults, and the writer the prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master's ruling ends an issue, and its line leaves this file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reviewer left no line here once the game master's rulings land reviews no more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Issues sit beside the page, so a full chapter's never push it over its ceiling.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
