import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTurnAdvance = {
  id: "01a0deca-7611-72a6-9435-385ed7dedb72",
  type: "page-type/command",
  slug: "story-turn-advance",
  definition: "the command moving a played turn on from its status, with what that status made",
  code: "ts",
  test: "ts",
  parts: [],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a step made lands on the turn in the landing that moves its status.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call handing in two steps' output is refused before anything is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn moving tells the game's game master and world builder seats of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn moving into reviewers starts one fresh seat for each story reviewer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn moving into writer starts one fresh seat for the writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat started here sits as the persona of the game's game master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reviewer's or the writer's seat is stopped once its own advance lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stop runs apart from the seat, so ending the seat never ends the stop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice or a start that fails after the landing is told, and undoes nothing.",
    },
  ],
  name: "advance",
  arguments: [
    { argument: "argument/played-turn", required: true },
    { argument: "argument/turn-lore", repeats: true },
    { argument: "argument/beats-file" },
    { argument: "argument/reviewer" },
    { argument: "argument/issues-file" },
    { argument: "argument/prose-file" },
    { argument: "argument/character", repeats: true },
  ],
} as const satisfies Command
