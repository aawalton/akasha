import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceWanGenerate = {
  id: "01a093fa-cf48-7c82-9dc2-020adb45aa53",
  type: "command",
  slug: "inference-wan-generate",
  definition: "the command rendering one clip conditioned on a first frame, a last frame, or both",
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
      statement: "Naming both frames has the model interpolate the first frame to the last.",
    },
    {
      invariantKind: "departure",
      statement: "Naming the last frame alone has the model make the lead-in to that frame.",
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
  ],
  name: "generate",
  arguments: [
    { argument: "argument/output" },
    { argument: "argument/timeout" },
    { argument: "argument/seed" },
    { argument: "argument/steps" },
    { argument: "argument/size" },
    { argument: "argument/lightning" },
    { argument: "argument/start-image", oneOf: ["argument/end-image"] },
    { argument: "argument/end-image" },
    { argument: "argument/clip-frames" },
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
