import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const state = {
  id: "01a07235-8d04-7c15-8c68-fc8181d908e4",
  type: "page-type/file-property",
  slug: "state",
  propertySlug: "state",
  definition: "what a part of the code editor shows",
  extensions: ["json"],
  generated: true,
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page is committed and the file beside that page is not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's type puts this file beside the page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page states this file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file with nothing yet is the editor's cue to draw nothing rather than to wait.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One JSON document has the whole state a part of the editor draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write replaces the whole file rather than adding to the file.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-05T15:35:07.268Z",
  updatedAt: "2026-10-30T15:35:42.971Z",
} as const satisfies FileProperty
