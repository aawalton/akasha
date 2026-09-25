import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageReferenceReading = {
  id: "01a0a2f5-8283-7825-bfc3-faab9dc94d51",
  type: "page-type/module",
  slug: "page-reference-reading",
  definition: "what references a page, read from the file beside that page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What references a page is read from the file beside that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page asked about by id is reached through the identity index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page a file belongs to is asked of the index rather than read from its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's references are read once for one reading and held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each way a file is imported is answered as the line filed says, and never read again off the body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file imported more than one way names its importer once among the importers.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "An answer comes back in one order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading that answers nothing at all answers none rather than refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that is missing reads as a page nothing references.",
    },
  ],
} as const satisfies Module
