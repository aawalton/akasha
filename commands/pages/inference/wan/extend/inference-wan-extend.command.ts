import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceWanExtend = {
  id: "01a093fb-0896-7f06-b8ca-489590932fe3",
  type: "command",
  slug: "inference-wan-extend",
  definition: "the command rendering fresh frames before or after a clip",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every word this takes is a flag or a flag's value.",
    },
    {
      invariantKind: "departure",
      statement: "A flag this does not take is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "Only the frames beside the conditioning window are denoised.",
    },
    {
      invariantKind: "constraint",
      statement: "One workload runs on the GPU at a time.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here waits for the GPU to come free.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts the container or provisions the weights.",
    },
    {
      invariantKind: "departure",
      statement: "An extend that threw after staging names that staging in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
    {
      invariantKind: "departure",
      statement: "The rendering is handed in.",
    },
  ],
  name: "extend",
  arguments: [
    { argument: "argument/output" },
    { argument: "argument/timeout" },
    { argument: "argument/seed" },
    { argument: "argument/steps" },
    { argument: "argument/size" },
    { argument: "argument/lightning" },
    { argument: "argument/context", required: true },
    { argument: "argument/direction", required: true },
    { argument: "argument/context-frames" },
    { argument: "argument/new-frames" },
    { argument: "argument/prompt-file" },
    { argument: "argument/negative-prompt-file" },
    { argument: "argument/negative-prompt", notWith: ["argument/negative-prompt-file"] },
    {
      argument: "argument/render-prompt",
      notWith: ["argument/prompt-file"],
      oneOf: ["argument/prompt-file"],
    },
  ],
} as const satisfies Command
