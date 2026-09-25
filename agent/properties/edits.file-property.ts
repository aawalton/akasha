import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const edits = {
  id: "01a07771-c8a1-7ef9-b931-04ce8f6bbc85",
  type: "page-type/file-property",
  slug: "edits",
  propertySlug: "edits",
  definition: "the changes an agent makes before a commit",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "edit" },
    { partOfSpeech: "part-of-speech/noun", spelling: "edits" },
  ],
  extensions: ["jsonl"],
  runsFileLength: false,
  generated: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line has one edit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change appends its lines rather than rewriting the file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lines are kept outside the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line rolls into the next numbered file where the ceiling is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line states one edit of the four kinds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line has the paths and bodies that edit names and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line holds whether the readers of that path owe the reading again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line with nothing there leaves those readers owing the reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lines are folded into one answer before that answer is replayed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lines are read in the order the lines were appended.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No author writes a line here by hand.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
