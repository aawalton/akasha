import type { NamePlace } from "akasha/page/name-place/name-place.page-type.types.ts"

export const fileName = {
  id: "01a04fd0-c6e7-7e50-89dc-16bd43ca72b7",
  type: "page-type/name-place",
  slug: "file-name",
  definition: "the name a file carries",
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file's name is built of parts parted by dots.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each part is a name stated elsewhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first part is the slug of the page the file has or sits beside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The part after the first part is the slug of that page's page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part after those two is the file's role.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file naming no role is the page itself.",
    },
  ],
} as const satisfies NamePlace
