import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const history = {
  id: "01a0c9fe-db25-75da-99e7-c4f8a29375a8",
  type: "page-type/file-property",
  slug: "history",
  propertySlug: "history",
  definition: "the number a mechanic had at each turn that number changed",
  extensions: ["jsonl"],
  appendOnly: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is appended rather than written over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line says a turn's number rather than naming that turn's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The turn a line numbers is a turn of the story the mechanic's character is in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No line is written for a turn that left the number alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page says what is true now, and this file says what was true before.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
