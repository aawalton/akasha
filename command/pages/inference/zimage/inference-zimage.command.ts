import type { Command } from "akasha/command/command.page-type.types.ts"

export const inferenceZimage = {
  id: "01a0680a-9cc0-7f99-8e78-ba4b0f5be1dd",
  type: "command",
  slug: "inference-zimage",
  definition: "the command rendering one image off a registered checkpoint",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The port ComfyUI answers on is what `ZIMAGE_PORT` names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The host data directory is what `ZIMAGE_HOME` names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every word this takes is a flag or a flag's value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The flags this command takes are the flags mflux-generate takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A model nothing registers is refused naming the models there are.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The steps and the guidance nothing named come off the named model's own profile.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A base model said here is passed over and the render goes by the model said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A checkpoint is staged under a name the path that checkpoint came from is hashed into.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A checkpoint already staged at the size that checkpoint has is staged no second time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One checkpoint is rendered against.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seed nothing named is drawn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The image is written where the caller named that image and nowhere else.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "One workload runs on the GPU at a time.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here starts the container or provisions the weights.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The copy is named as soon as that copy lands, and the staging again once that copy is moved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A render that threw part way names those files in its refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A render that refused part way says what it had passed over by then.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The copying and the moving are handed in.",
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
    {
      argument: "argument/render-prompt",
      notWith: ["argument/prompt-file"],
      oneOf: ["argument/prompt-file"],
    },
  ],
} as const satisfies Command
