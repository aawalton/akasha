import type { Command } from "akasha/command/command.page-type.types.ts"

export const inferenceEdit = {
  id: "01a0685e-fd50-7c57-a7d6-7a1be279c52c",
  type: "page-type/command",
  slug: "inference-edit",
  definition: "the command remaking an image under an instruction, keeping its subject",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "`--image` is named again for each further image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first image named is the subject and every later image is a reference.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The engine is reached with the key `GEMINI_API_KEY` holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ratio nothing named leaves the output at the input's own shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A size nothing named leaves the output at the input's own size.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The output is transcoded to the format the path named asks for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every reference is hashed onto the run row alongside the subject.",
    },
    {
      decisionKind: "decision-kind/departure",
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
