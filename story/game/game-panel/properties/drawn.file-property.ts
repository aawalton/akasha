import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const drawn = {
  id: "01a0c4aa-d1e0-72a8-83ce-aa0c398fe652",
  type: "page-type/file-property",
  slug: "drawn",
  propertySlug: "drawn",
  definition: "a panel's code as a browser runs it, written again whenever that code changes",
  extensions: ["js"],
  generated: true,
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The file is beside the page of the panel it is of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file is written by the landing rather than by an author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser asks for this file by name and runs what comes back.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is imported, so no bundle carries a panel.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
