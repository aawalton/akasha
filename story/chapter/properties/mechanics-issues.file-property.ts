import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const mechanicsIssues = {
  id: "01a10324-8b4d-7386-a044-57af3f367c03",
  type: "page-type/file-property",
  slug: "mechanics-issues",
  propertySlug: "mechanics-issues",
  definition: "the reasons the mechanics step found beats of a turn or chapter cannot work",
  extensions: ["txt"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line is one issue, of at most 100 characters, and a file holds at most 100.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An issue names the beat it faults by number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master mends the beats each issue faults, and its advance clears them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each mechanics seat's issues join the ones the turn holds from the seats before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A mend moving no beat runs the mechanics seats again only where this file has a line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file goes as the turn reaches player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Issues sit beside the page, so a full chapter's never push it over its ceiling.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
