import type { Command } from "@akasha/command-system/command"

export const inferenceGenerate = {
  id: "01a0685e-fd50-7a4c-ba59-ae4e2497a4c5",
  pageTypeSlug: "command",
  slug: "inference-generate",
  definition: "the command rendering one image off a prompt through an image pool service",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "--prompt <text>", takes: "what the image is of" },
    {
      said: "--prompt-file <path>",
      takes: "that prompt read from a path, or `-` for standard input",
    },
    { said: "--output <path>", takes: "where the PNG is written" },
    { said: "--size <WxH>", takes: "how wide and how tall the image is rendered" },
    { said: "--seed <n>", takes: "the sampler seed" },
    { said: "--guidance <n>", takes: "how far the sampler is pushed toward the prompt" },
    { said: "--steps <n>", takes: "denoise steps" },
    { said: "--timeout <s>", takes: "how many seconds the wait on the pool runs for" },
    { said: "--service <name>", takes: "the image pool service the render goes through" },
    { said: "--no-persist", takes: "leave the image where it was written and file no page for it" },
  ],
  helpNotes: [
    "each dimension runs from 256 to 4096 and is a multiple of sixteen.",
    "the service is an image-generation pool member, and one binding another model type is refused.",
    "the model rendered against is the model path that service's command binds.",
    "a seed nothing named is drawn, and the seed is recorded whether it was drawn or said.",
    "the guidance is recorded on the run row, and a turbo distill passes it over.",
    "the pool serves one request at a time, so the timeout counts the queue wait as well as the render.",
    "a run row is filed whether the render finished or failed.",
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
      statement: "A seed is recorded whether it was drawn or said.",
    },
    {
      invariantKind: "departure",
      statement: "The image is written where the caller named it and nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "A run row is filed whether the render finished or failed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes the service resident.",
    },
  ],
} as const satisfies Command
