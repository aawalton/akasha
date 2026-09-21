import type { Command } from "akasha/command/command.page-type.types.ts"

export const requestComplete = {
  id: "01a0c501-03d8-743f-94e6-9e585b39559a",
  type: "page-type/command",
  slug: "request-complete",
  definition: "the command moving a feature request from published to completed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A feature request is named by the slug that request declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name that is no feature request is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming other than one word is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A request at any standing other than published is refused, naming the standing it is at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request whose page says no standing is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Changing the standing is left to the mechanical change of that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run says the commit that run landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change that refused is a fault of the data.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Completing a request moves no points, the points behind it being spent already.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here moves any contribution point.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks Alan to confirm.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a body.",
    },
  ],
  name: "complete",
  arguments: [{ argument: "argument/feature-request", required: true, saidAs: "word" }],
} as const satisfies Command
