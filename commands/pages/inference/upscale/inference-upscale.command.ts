import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceUpscale = {
  id: "01a0685e-fd50-7de7-851b-a0d871ef8910",
  type: "command",
  slug: "inference-upscale",
  definition: "the command remaking one image at a higher resolution on a GPU",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "`UPSCALE_HOME` names the workstation's data directory.",
    },
    {
      invariantKind: "departure",
      statement: "The resolution is the shortest edge in pixels.",
    },
    {
      invariantKind: "departure",
      statement: "A resolution at or below zero is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The cluster runs the work where nothing names a host.",
    },
    {
      invariantKind: "departure",
      statement: "A host that is neither the cluster nor the workstation is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The seed the recipe has is used where nothing names a seed.",
    },
    {
      invariantKind: "departure",
      statement: "The image is written where the caller named that image and nowhere else.",
    },

    {
      invariantKind: "absence",
      statement: "Nothing here provisions the weights or starts the container.",
    },
  ],
  name: "upscale",
  arguments: [
    { argument: "argument/output" },
    { argument: "argument/seed" },
    { argument: "argument/no-persist" },
    { argument: "argument/image", required: true, saidAs: "flag-or-word" },
    { argument: "argument/host" },
    { argument: "argument/resolution", required: true },
  ],
} as const satisfies Command
