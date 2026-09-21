import type { Command } from "akasha/command/command.page-type.types.ts"

export const requestPublish = {
  id: "01a0c501-03d8-75ca-9ff4-136d081ccca4",
  type: "page-type/command",
  slug: "request-publish",
  definition: "the command moving a feature request from proposed to published",
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
        "A request already published, completed or denied is refused, naming the standing it is at.",
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
  name: "publish",
  arguments: [{ argument: "argument/feature-request", required: true, saidAs: "word" }],
} as const satisfies Command
