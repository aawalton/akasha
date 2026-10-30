import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureStory = {
  id: "01a0e949-f245-7163-a996-799b18d81b93",
  type: "page-type/command",
  slug: "measure-story",
  definition: "the command saying how long each phase of a story's turns or chapters took",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call naming no argument reads the phases started in the past twenty-four hours.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count reads every phase of that many of the newest turns or chapters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The phases are read from beside every played and written story's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each story's phases are drawn under that story, with the whole turn or chapter last.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each phase says its middle, its average and its most, and the middle wait and work.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Under each phase of a one-seat turn, each checklist step is drawn on a line of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A step's line folds its beats together and says its count, middle, average and most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story or a phase whose rows name no step is drawn with no step line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A one-seat turn's memory, handed in at player, is drawn on its own line after the whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That memory counts in no phase and not in the whole, so the whole is the time to player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nor does it count in the turn made while it was open, which starts once that memory lands.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes no value the commit has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An argument this command does not take is refused.",
    },
  ],
  name: "story",
  arguments: [{ argument: "argument/run-window" }],
  createdAt: "2026-09-28T18:32:12.613Z",
  updatedAt: "2026-10-30T16:00:42.791Z",
} as const satisfies Command
