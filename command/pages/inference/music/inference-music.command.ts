import type { Command } from "akasha/command/command.page-type.types.ts"

export const inferenceMusic = {
  id: "01a0685e-fd50-7626-bd25-d34e54379501",
  type: "page-type/command",
  slug: "inference-music",
  definition: "the command rendering a song off a style and, where there is one, its lyrics",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Lyrics nothing named render an instrumental.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The render is submitted as a task and polled until that task finishes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The timeout counts the whole wait rather than one request.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seed nothing named is drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seed is recorded whether the seed was drawn or named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The audio is written where the caller named that audio and nowhere else.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes the music service resident.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt names the style, the mood and the instruments the song carries.",
    },
  ],
  name: "music",
  arguments: [
    { argument: "argument/output" },
    { argument: "argument/timeout" },
    { argument: "argument/seed" },
    { argument: "argument/no-persist" },
    { argument: "argument/steps" },
    { argument: "argument/duration" },
    { argument: "argument/vocal-language" },
    { argument: "argument/prompt-file" },
    { argument: "argument/lyrics-file" },
    { argument: "argument/lyrics", notWith: ["argument/lyrics-file"] },
    {
      argument: "argument/render-prompt",
      notWith: ["argument/prompt-file"],
      oneOf: ["argument/prompt-file"],
    },
  ],
} as const satisfies Command
