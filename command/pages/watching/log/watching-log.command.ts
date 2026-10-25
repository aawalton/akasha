import type { Command } from "akasha/command/command.page-type.types.ts"

export const watchingLog = {
  id: "01a13bd7-c014-7d8c-a51d-3cb5159400a8",
  type: "page-type/command",
  slug: "watching-log",
  definition: "the command logging a show or film Alan watched from a link naming it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating the provider and the id is the page logged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link to Netflix, Prime Video or TMDB is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A TMDB link reaches only a page of the kind its path names.",
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
      statement: "A title no page holds is looked up by the provider's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title no lookup answers is refused, and nothing is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call saying `--episode` logs one more episode of a show as watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A film is refused `--episode`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call saying `--episode` says no status.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A show no page holds is written before its episode is logged.",
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
  parts: ["module/episode-watching"],
  name: "log",
  arguments: [
    { argument: "argument/link", required: true },
    { argument: "argument/collection-status" },
    { argument: "argument/episode", notWith: ["argument/collection-status"] },
    { argument: "argument/day" },
  ],
  createdAt: "2026-10-14T19:15:57.587Z",
  updatedAt: "2026-10-25T23:38:46.276Z",
} as const satisfies Command
