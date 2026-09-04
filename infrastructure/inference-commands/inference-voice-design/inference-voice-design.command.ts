import type { Command } from "@akasha/command-system/command"

export const inferenceVoiceDesign = {
  id: "01a0685e-fd50-7904-a9a9-f7caf17947c0",
  pageTypeSlug: "command",
  slug: "inference-voice-design",
  definition: "the command speaking text in a voice made up from a description of it",
  code: "ts",
  changeKindSlug: "change-mechanical",
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
    { said: "--text-file <path>", takes: "that text read from a path, or `-` for standard input" },
    { said: "--service <name>", takes: "the backend the voice is made on" },
    { said: "--lang <name>", takes: "the language the speaking is in" },
    { said: "--output <path.wav>", takes: "where the WAV is written" },
    { said: "--no-persist", takes: "leave the audio where it was written and file no page for it" },
  ],
  helpNotes: [
    "both models raise without a description, so a call naming none is refused rather than passed on.",
    "the language is sent to the backend that takes one, and the other takes accent and language inside the description.",
    "the text is not cut into pieces, so a few sentences is what this is for.",
    "the sampling the server is asked for is fixed here and recorded on the run row.",
    "a run row is filed whether the speaking finished or failed.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call naming no description is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The language is sent only to the backend that takes one.",
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
      statement: "The audio is written where the caller named it and nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "A run row is filed whether the speaking finished or failed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here cuts the text into pieces.",
    },
  ],
} as const satisfies Command
