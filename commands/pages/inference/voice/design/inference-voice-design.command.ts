import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceVoiceDesign = {
  id: "01a0685e-fd50-7904-a9a9-f7caf17947c0",
  type: "command",
  slug: "inference-voice-design",
  definition: "the command speaking text in a voice made up from a description of it",
  code: "ts",
  taking: [
    { said: "--instruct <description>", takes: "the voice described in words" },
    {
      said: "--instruct-file <path>",
      takes: "that description read from a path, or `-` for standard input",
    },
    {
      said: "--text <transcript>",
      takes: "what the voice says, which becomes the clip's transcript",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The sampling is fixed here and recorded on the run row.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no description is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The language is sent only to the backend that takes a language.",
    },
    {
      invariantKind: "departure",
      statement: "The model spoken through is settled by the backend named.",
    },
    {
      invariantKind: "departure",
      statement: "An answer that is no RIFF payload is a fault rather than a file written.",
    },
    {
      invariantKind: "departure",
      statement: "The audio is written where the caller named that audio and nowhere else.",
    },

    {
      invariantKind: "absence",
      statement: "Nothing here cuts the text into pieces.",
    },
  ],
  name: "design",
  arguments: [
    { argument: "argument/output" },
    { argument: "argument/no-persist" },
    { argument: "argument/service" },
    { argument: "argument/lang" },
    { argument: "argument/text-file" },
  ],
} as const satisfies Command
