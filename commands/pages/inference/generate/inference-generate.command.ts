import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceGenerate = {
  id: "01a0685e-fd50-7a4c-ba59-ae4e2497a4c5",
  type: "command",
  slug: "inference-generate",
  definition: "the command rendering one image off a prompt through an image pool service",
  code: "ts",
  taking: [
    { said: "--prompt <text>", takes: "what the image is of" },
    {
      said: "--prompt-file <path>",
      takes: "that prompt read from a path, or `-` for standard input",
    },
    { said: "--size <WxH>", takes: "how wide and how tall the image is rendered" },
    { said: "--guidance <n>", takes: "how far the sampler is pushed toward the prompt" },
    { said: "--service <name>", takes: "the image pool service the render goes through" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each dimension is a multiple of sixteen inside the range the service takes.",
    },
    {
      invariantKind: "departure",
      statement: "A service that is no image-generation pool member is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The model is the model path the service's command binds.",
    },
    {
      invariantKind: "departure",
      statement: "A seed nothing named is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A seed is recorded whether that seed was drawn or said.",
    },
    {
      invariantKind: "departure",
      statement: "The guidance is recorded on the run row.",
    },
    {
      invariantKind: "departure",
      statement: "The image is written where the caller named that image and nowhere else.",
    },

    {
      invariantKind: "absence",
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
  ],
} as const satisfies Command
