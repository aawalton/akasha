import type { Command } from "@akasha/command-system/command"

export const inferenceMusic = {
  id: "01a0685e-fd50-7626-bd25-d34e54379501",
  pageTypeSlug: "command",
  slug: "inference-music",
  definition: "the command rendering one song off a style and, where there is one, its lyrics",
  code: "ts",
  changeKindSlug: "change-mechanical",
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
    { said: "--steps <n>", takes: "diffusion steps" },
    { said: "--seed <n>", takes: "the sampler seed" },
    { said: "--vocal-language <code>", takes: "the language the singing is in" },
    { said: "--timeout <s>", takes: "how many seconds the wait on the task runs for" },
    { said: "--output <path.wav>", takes: "where the WAV is written" },
    { said: "--no-persist", takes: "leave the audio where it was written and file no page for it" },
  ],
  helpNotes: [
    "lyrics nothing named render an instrumental rather than silence.",
    "the render is submitted as a task and then polled, so the timeout counts the whole wait rather than one request.",
    "a seed nothing named is drawn, and the seed is recorded whether it was drawn or said.",
    "the steps default to what the turbo distill was trained for, and raising them costs time for quality.",
    "a run row is filed whether the render finished or failed.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Lyrics nothing named render an instrumental.",
    },
    {
      invariantKind: "departure",
      statement: "The render is submitted as a task and polled until it finishes.",
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
      statement: "The audio is written where the caller named it and nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "A run row is filed whether the render finished or failed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes the music service resident.",
    },
  ],
} as const satisfies Command
