import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceUpscale = {
  id: "01a0685e-fd50-7de7-851b-a0d871ef8910",
  type: "command",
  slug: "inference-upscale",
  definition: "the command remaking one image at a higher resolution on a GPU",
  code: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "<image>", takes: "the image remade, said without a flag" },
    { said: "--image <path>", takes: "that image said as a flag instead" },
    { said: "--host <where>", takes: "which GPU the work runs on" },
    { said: "--output <path>", takes: "where the remade image is written" },
    { said: "--resolution <px>", takes: "how many pixels the shortest edge is remade at" },
    { said: "--seed <n>", takes: "the sampler seed" },
    { said: "--no-persist", takes: "leave the image where it was written and file no page for it" },
  ],
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
} as const satisfies Command
