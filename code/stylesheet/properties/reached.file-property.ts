import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const reached = {
  id: "01a0be69-6956-778e-b4d2-535b2dc1b146",
  type: "page-type/file-property",
  slug: "reached",
  propertySlug: "reached",
  definition: "the paths an entry stylesheet's app imports its way to",
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
      statement: "A line names one path the app reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file with no line yet is worked out by following every import the app has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change naming no path a line here holds moves no glob.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
