import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceWanScore = {
  id: "01a093fb-9d2a-7ffc-a042-a59588f4a83d",
  type: "command",
  slug: "inference-wan-score",
  definition: "the command measuring each frame's cosine against a reference identity",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every word this takes is a flag or a flag's value.",
    },
    {
      invariantKind: "departure",
      statement: "A flag this does not take is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "One row is answered for each frame and nothing beside those rows.",
    },
    {
      invariantKind: "departure",
      statement: "Each row carries its frame's cosine and whether that cosine clears the floor.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reference no face is found in is answered against the data rather than the caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the GPU.",
    },
  ],
  name: "score",
  arguments: [
    { argument: "argument/frames-dir", required: true },
    { argument: "argument/reference", required: true },
    { argument: "argument/floor" },
  ],
} as const satisfies Command
