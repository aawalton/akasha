import type { Command } from "akasha/command/command.page-type.types.ts"

export const inferenceGenerate = {
  id: "01a0685e-fd50-7a4c-ba59-ae4e2497a4c5",
  type: "page-type/command",
  slug: "inference-generate",
  definition: "the command rendering an image off a prompt through an image pool service",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each dimension is a multiple of sixteen inside the range the service takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service that is no image-generation pool member is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The model is the model path the service's command binds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seed nothing named is drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seed is recorded whether that seed was drawn or said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The guidance is recorded on the run row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The image is written where the caller named that image and nowhere else.",
    },

    {
      decisionKind: "decision-kind/absence",
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
