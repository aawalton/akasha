import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceZimage = {
  id: "01a0680a-9cc0-7f99-8e78-ba4b0f5be1dd",
  type: "command",
  slug: "inference-zimage",
  definition: "the command rendering one image off a registered checkpoint",
  code: "ts",
  test: "ts",
  taking: [
    { said: "--prompt <text>", takes: "what the image is of" },
    { said: "--prompt-file <path>", takes: "that prompt read from a path, or `-` for stdin" },
    { said: "--negative-prompt <text>", takes: "what the sampler is steered away from" },
    {
      said: "--negative-prompt-file <path>",
      takes: "that steering read from a path, or `-` for stdin",
    },
    { said: "--output <path>", takes: "where the PNG is written" },
    { said: "--model <id>", takes: "the registered checkpoint the render goes through" },
    { said: "--base-model <name>", takes: "the selector mflux takes here, which is passed over" },
    { said: "--width <n>", takes: "how wide the image is rendered" },
    { said: "--height <n>", takes: "how tall the image is rendered" },
    { said: "--steps <n>", takes: "denoise steps" },
    { said: "--guidance <f>", takes: "how far the sampler is pushed toward the prompt" },
    { said: "--lora-paths <path>", takes: "the one checkpoint the render is measured against" },
    { said: "--lora-scales <f>", takes: "how strongly that checkpoint is mixed in" },
    { said: "--seed <n>", takes: "the sampler seed" },
    { said: "--timeout <s>", takes: "how many seconds the wait on ComfyUI runs for" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The port ComfyUI answers on is what `ZIMAGE_PORT` names.",
    },
    {
      invariantKind: "departure",
      statement: "The host data directory is what `ZIMAGE_HOME` names.",
    },
    {
      invariantKind: "departure",
      statement: "Every word this takes is a flag or a flag's value.",
    },
    {
      invariantKind: "departure",
      statement: "The flags this command takes are the flags mflux-generate takes.",
    },
    {
      invariantKind: "departure",
      statement: "A model nothing registers is refused naming the models there are.",
    },
    {
      invariantKind: "departure",
      statement: "The steps and the guidance nothing named come off the named model's own profile.",
    },
    {
      invariantKind: "departure",
      statement: "A base model said here is passed over and the render goes by the model said.",
    },
    {
      invariantKind: "departure",
      statement:
        "A checkpoint is staged under a name the path that checkpoint came from is hashed into.",
    },
    {
      invariantKind: "departure",
      statement:
        "A checkpoint already staged at the size that checkpoint has is staged no second time.",
    },
    {
      invariantKind: "departure",
      statement: "One checkpoint is rendered against.",
    },
    {
      invariantKind: "departure",
      statement: "A seed nothing named is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "The image is written where the caller named that image and nowhere else.",
    },
    {
      invariantKind: "constraint",
      statement: "One workload runs on the GPU at a time.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts the container or provisions the weights.",
    },
  ],
  name: "zimage",
} as const satisfies Command
