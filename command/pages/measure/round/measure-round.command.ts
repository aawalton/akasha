import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureRound = {
  id: "01a0bb27-36f8-7e61-bb63-33e3d2ab2ba2",
  type: "page-type/command",
  slug: "measure-round",
  definition: "the command saying what one round of the audit cost on the machine that ran it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run is one round of the audit rather than one check's audit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no argument reads the rounds of the past twenty-four hours.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows are read from beside the page of the command an audit is asked by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That page is asked of the index rather than spelled here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A root whose index names no such page holds no round.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every numbered file of those rows is read rather than the first alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row that is no round counts nowhere here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The call a workstation made to ask for a round is such a row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seconds read are the ones the machine that ran the round spent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "They carry the checks a round spawned as well as the round's own process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that would not read is named rather than counting as no runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row a write left half appended is passed over and the rest of the file read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The total counts the distinct runs read rather than the records read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The total draws its average memory as `-`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that noted no high-water mark is left out of the memory reported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An argument this command does not take is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes no value the commit has.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a round.",
    },
  ],
  name: "round",
  arguments: [{ argument: "argument/run-window" }],
} as const satisfies Command
