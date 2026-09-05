import type { Command } from "../../command-system/commands/command.page-type.ts"

export const zimage = {
  id: "01a0680a-9cc0-7f99-8e78-ba4b0f5be1dd",
  pageTypeSlug: "command",
  slug: "zimage",
  definition: "the command rendering one image off a registered checkpoint",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "generate", takes: "the act, which is one image written to a named path" },
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
  helpNotes: [
    "the act is the first word, and this carries one act.",
    "the flags are the ones mflux-generate takes, so a rig aimed at this renders through it with no change to how the rig calls.",
    "a model nothing registers is refused, naming the models there are.",
    "the steps and the guidance nothing named come off the named model's own profile.",
    "a checkpoint is staged into the container's LoRA volume under a name the path it came from is hashed into, and mixed in for this render alone.",
    "one checkpoint is rendered against, and a comma list of them is refused.",
    "a seed nothing named is drawn.",
    "a path said here is read against the repository root rather than the folder the call was made from.",
    "the port ComfyUI answers on is `ZIMAGE_PORT` and the host data directory is `ZIMAGE_HOME`.",
    "the container is up and the weights are provisioned before this reaches the GPU.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The act is the first word.",
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
      statement: "A checkpoint is staged under a name the path it came from is hashed into.",
    },
    {
      invariantKind: "departure",
      statement:
        "A checkpoint already standing staged at the size it carries is staged no second time.",
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
      statement: "The image is written where the caller named it and nowhere else.",
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
} as const satisfies Command
