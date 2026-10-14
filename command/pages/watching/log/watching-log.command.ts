import type { Command } from "akasha/command/command.page-type.types.ts"

export const watchingLog = {
  id: "01a13bd7-c014-7d8c-a51d-3cb5159400a8",
  type: "page-type/command",
  slug: "watching-log",
  definition: "the command logging a show or film Alan watched from the link he watched it at",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A link is read for its provider and the id that provider gives the title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link to neither Netflix nor Prime Video is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating the provider and the id is the page logged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page of the same kind and title is the page logged where no page states the id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page logged that way is given the provider and the id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title no page holds is looked up on Wikidata by the provider's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Prime Video title Wikidata does not hold is read from its Prime Video page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title no lookup answers is refused, and nothing is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page already completed keeps its status.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page logged as completed states the day as when it was completed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no day acts on the US Mountain day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no status logs the title as in progress.",
    },
  ],
  name: "log",
  arguments: [
    { argument: "argument/link", required: true },
    { argument: "argument/collection-status", default: "in-progress" },
    { argument: "argument/day" },
  ],
  createdAt: "2026-10-14T19:15:57.587Z",
  updatedAt: "2026-10-14T19:15:57.587Z",
} as const satisfies Command
