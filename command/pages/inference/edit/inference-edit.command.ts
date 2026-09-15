import type { Command } from "akasha/command/command.page-type.types.ts"

export const inferenceEdit = {
  id: "01a0685e-fd50-7c57-a7d6-7a1be279c52c",
  type: "command",
  slug: "inference-edit",
  definition: "the command remaking one image under an instruction, keeping what it is of",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "`--image` is named again for each further image.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first image named is the subject and every later image is a reference.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The engine is reached with the key `GEMINI_API_KEY` holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ratio nothing named leaves the output at the input's own shape.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A size nothing named leaves the output at the input's own size.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The output is transcoded to the format the path named asks for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every reference is hashed onto the run row alongside the subject.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No key set refuses the call rather than reaching the engine.",
    },
  ],
  name: "edit",
  arguments: [
    { argument: "argument/output" },
    { argument: "argument/timeout" },
    { argument: "argument/no-persist" },
    { argument: "argument/size" },
    { argument: "argument/refs" },
    { argument: "argument/engine" },
    { argument: "argument/aspect-ratio" },
    { argument: "argument/prompt-file" },
    { argument: "argument/image", required: true, repeats: true },
    {
      argument: "argument/render-prompt",
      notWith: ["argument/prompt-file"],
      oneOf: ["argument/prompt-file"],
    },
  ],
} as const satisfies Command
