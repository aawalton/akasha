import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const subagentReads = {
  id: "01a09cff-814a-7077-9e1f-fcf98a8e0100",
  type: "page-type/file-property",
  slug: "subagent-reads",
  propertySlug: "subagent-reads",
  definition: "the readings a seat keeps for a subagent that has no page",
  extensions: ["jsonl"],
  runsFileLength: false,
  generated: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line has one reading, as a line beside an agent's own page has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent's page going appends the readings that subagent had made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line says the agent id the reading was made by.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A reading here answers nothing the seat itself is asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line goes back to its subagent's own readings as that subagent's page does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This file goes once the last line it holds has gone back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line goes where the sweep takes away the page of the subagent that made it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An ordinary take-down drops no line here, its subagent being able to resume.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line goes where its subagent's last record predates the client the seat runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line going back to its own page beats a line going for being that old.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line neither given back, swept, nor outlived goes with the seat's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lines are kept outside the commit.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No author writes a line here by hand.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
