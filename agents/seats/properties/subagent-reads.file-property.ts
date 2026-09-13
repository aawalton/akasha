import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const subagentReads = {
  id: "01a09cff-814a-7077-9e1f-fcf98a8e0100",
  type: "file-property",
  slug: "subagent-reads",
  propertySlug: "subagent-reads",
  definition: "the readings a subagent under a seat had made when its page went",
  extensions: ["jsonl"],
  runsFileLength: false,
  generated: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "One line has one reading, as a line beside an agent's own page has.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's page going appends the readings that subagent had made.",
    },
    {
      invariantKind: "departure",
      statement: "A line says the agent id the reading was made by.",
    },
    {
      invariantKind: "absence",
      statement: "A reading here answers nothing the seat itself is asked.",
    },
    {
      invariantKind: "departure",
      statement: "A line goes back to its subagent's own readings as that subagent's page does.",
    },
    {
      invariantKind: "departure",
      statement: "This file goes once the last line it holds has gone back.",
    },
    {
      invariantKind: "departure",
      statement: "A line goes where the sweep takes away the page of the subagent that made it.",
    },
    {
      invariantKind: "absence",
      statement: "An ordinary take-down drops no line here, its subagent being able to resume.",
    },
    {
      invariantKind: "departure",
      statement: "A line neither given back nor swept goes with the seat's own page.",
    },
    {
      invariantKind: "departure",
      statement: "Lines are kept outside the commit.",
    },
    {
      invariantKind: "absence",
      statement: "No author writes a line here by hand.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
