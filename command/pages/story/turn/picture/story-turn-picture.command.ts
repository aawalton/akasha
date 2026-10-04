import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTurnPicture = {
  id: "01a106f8-d29d-7c1f-b833-eb571240be41",
  type: "page-type/command",
  slug: "story-turn-picture",
  definition:
    "the command landing a written chapter's beat pictures on their beats as they are made",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each picture handed is set on its beat at once, replacing what that beat pictured.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The chapter's scenes become every beat's picture in beat order, in the same landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a chapter of a story stating `picturesOnBeats` is pictured this way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is pictured at any step, so a draft shows its pictures as they land.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picturing holds its chapter from reading it to landing, as an advance does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture already on its beat lands nothing again.",
    },
  ],
  name: "picture",
  arguments: [
    { argument: "argument/written-chapter", required: true },
    { argument: "argument/pictured-file", required: true },
  ],
} as const satisfies Command
