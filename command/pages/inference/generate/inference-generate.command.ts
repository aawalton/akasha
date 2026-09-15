import type { Command } from "akasha/command/command.page-type.types.ts"

export const inferenceGenerate = {
  id: "01a0685e-fd50-7a4c-ba59-ae4e2497a4c5",
  type: "command",
  slug: "inference-generate",
  definition: "the command rendering one image off a prompt through an image pool service",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each dimension is a multiple of sixteen inside the range the service takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service that is no image-generation pool member is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The model is the model path the service's command binds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seed nothing named is drawn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seed is recorded whether that seed was drawn or said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The guidance is recorded on the run row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The image is written where the caller named that image and nowhere else.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here makes the service resident.",
    },
  ],
  name: "generate",
  arguments: [
    { argument: "argument/output" },
    { argument: "argument/timeout" },
    { argument: "argument/seed" },
    { argument: "argument/no-persist" },
    { argument: "argument/steps" },
    { argument: "argument/size" },
    { argument: "argument/service" },
    { argument: "argument/guidance" },
    { argument: "argument/prompt-file" },
    {
      argument: "argument/render-prompt",
      notWith: ["argument/prompt-file"],
      oneOf: ["argument/prompt-file"],
    },
  ],
} as const satisfies Command
