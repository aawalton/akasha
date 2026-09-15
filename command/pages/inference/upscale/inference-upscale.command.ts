import type { Command } from "akasha/command/command.page-type.types.ts"

export const inferenceUpscale = {
  id: "01a0685e-fd50-7de7-851b-a0d871ef8910",
  type: "command",
  slug: "inference-upscale",
  definition: "the command remaking one image at a higher resolution on a GPU",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "`UPSCALE_HOME` names the workstation's data directory.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The resolution is the shortest edge in pixels.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A resolution at or below zero is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The cluster runs the work where nothing names a host.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A host that is neither the cluster nor the workstation is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seed the recipe has is used where nothing names a seed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The image is written where the caller named that image and nowhere else.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here provisions the weights.",
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
