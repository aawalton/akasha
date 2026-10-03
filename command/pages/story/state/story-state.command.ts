import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyState = {
  id: "01a10299-5dfe-7f4b-b89b-b0b3fe5b0896",
  type: "page-type/command",
  slug: "story-state",
  definition: "the command replaying a story's beats and naming where its pages drifted from them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A state names the clock, where each character is and each value the beats reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A state names each fact the reader was shown, and the turn that showed it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fact shown or established that its page's facts do not hold word for word is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A state names each cached value its page holds otherwise than the beats leave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value changed between two turns by no beat is named as changed outside the beats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only a turn at player counts for numbers and knowers, as only its move wrote them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A played story replays its chapters in order, then its turns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A played chapter counts for numbers and knowers as a turn at player does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A state reads each turn's beats, scenes, changes and memory from its beats file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beats file that does not read is named, rather than replayed as no beats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A state writes nothing.",
    },
  ],
  name: "state",
  arguments: [{ argument: "argument/story", required: true }],
} as const satisfies Command
