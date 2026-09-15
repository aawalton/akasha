import type { Command } from "akasha/command/command.page-type.types.ts"

export const inferenceVoiceDesign = {
  id: "01a0685e-fd50-7904-a9a9-f7caf17947c0",
  type: "page-type/command",
  slug: "inference-voice-design",
  definition: "the command speaking text in a voice made up from a description of it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The sampling is fixed here and recorded on the run row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no description is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The language is sent only to the backend that takes a language.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The model spoken through is settled by the backend named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer that is no RIFF payload is a fault rather than a file written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The audio is written where the caller named that audio and nowhere else.",
    },

    {
      invariantKind: "invariant-kind/absence",
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
    { argument: "argument/instruct-file" },
    {
      argument: "argument/instruct",
      notWith: ["argument/instruct-file"],
      oneOf: ["argument/instruct-file"],
    },
    {
      argument: "argument/spoken-text",
      notWith: ["argument/text-file"],
      oneOf: ["argument/text-file"],
    },
  ],
} as const satisfies Command
