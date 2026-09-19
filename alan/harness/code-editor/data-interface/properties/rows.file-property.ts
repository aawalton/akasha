import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const rows = {
  id: "01a0ba8e-c769-75ad-9ec8-d28bfee2cd96",
  type: "page-type/file-property",
  slug: "rows",
  propertySlug: "rows",
  definition: "the per-page facts a part of the editor draws its picture from",
  extensions: ["jsonl"],
  generated: true,
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page is committed and the file beside that page is not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row holds what one page states and nothing worked out across pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is keyed by the path of the page that row is of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing replaces the rows of the pages its change names and keeps the rest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page holding nothing the picture draws has no row here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file with no line yet is drawn by reading every page once.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
