import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceMusic = {
  id: "01a0685e-fd50-7626-bd25-d34e54379501",
  type: "command",
  slug: "inference-music",
  definition: "the command rendering one song off a style and, where there is one, its lyrics",
  code: "ts",
  taking: [
    { said: "--prompt <text>", takes: "the style, the mood and the instruments the song carries" },
    {
      said: "--prompt-file <path>",
      takes: "that style read from a path, or `-` for standard input",
    },
    { said: "--lyrics <text>", takes: "the words the song sings" },
    {
      said: "--lyrics-file <path>",
      takes: "those words read from a path, or `-` for standard input",
    },
    { said: "--duration <s>", takes: "how many seconds the song runs for" },
    { said: "--vocal-language <code>", takes: "the language the singing is in" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Lyrics nothing named render an instrumental.",
    },
    {
      invariantKind: "departure",
      statement: "The render is submitted as a task and polled until that task finishes.",
    },
    {
      invariantKind: "departure",
      statement: "The timeout counts the whole wait rather than one request.",
    },
    {
      invariantKind: "departure",
      statement: "A seed nothing named is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "The seed is recorded whether the seed was drawn or named.",
    },
    {
      invariantKind: "departure",
      statement: "The audio is written where the caller named that audio and nowhere else.",
    },

    {
      invariantKind: "absence",
      statement: "Nothing here makes the music service resident.",
    },
  ],
  name: "music",
  arguments: [
    { argument: "argument/output" },
    { argument: "argument/timeout" },
    { argument: "argument/seed" },
    { argument: "argument/no-persist" },
    { argument: "argument/steps" },
  ],
} as const satisfies Command
