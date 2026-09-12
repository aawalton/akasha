import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceZimage = {
  id: "01a0680a-9cc0-7f99-8e78-ba4b0f5be1dd",
  type: "command",
  slug: "inference-zimage",
  definition: "the command rendering one image off a registered checkpoint",
  code: "ts",
  test: "ts",
  taking: [{ said: "--prompt <text>", takes: "what the image is of" }],
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
  arguments: [
    { argument: "argument/timeout" },
    { argument: "argument/seed" },
    { argument: "argument/steps" },
    { argument: "argument/guidance" },
    { argument: "argument/output", required: true },
    { argument: "argument/prompt-file" },
    { argument: "argument/negative-prompt-file" },
    { argument: "argument/model" },
    { argument: "argument/base-model" },
    { argument: "argument/width" },
    { argument: "argument/height" },
    { argument: "argument/lora-paths" },
    { argument: "argument/lora-scales" },
    { argument: "argument/negative-prompt", notWith: ["argument/negative-prompt-file"] },
  ],
} as const satisfies Command
