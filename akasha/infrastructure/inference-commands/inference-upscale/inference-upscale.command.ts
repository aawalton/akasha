import type { Command } from "@akasha/command-system/command"

export const inferenceUpscale = {
  id: "01a0685e-fd50-7de7-851b-a0d871ef8910",
  pageTypeSlug: "command",
  slug: "inference-upscale",
  definition: "the command remaking one image at a higher resolution on a GPU",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "<image>", takes: "the image remade, said without a flag" },
    { said: "--image <path>", takes: "that image said as a flag instead" },
    { said: "--host <where>", takes: "which GPU the work runs on" },
    { said: "--output <path>", takes: "where the remade image is written" },
    { said: "--resolution <px>", takes: "how many pixels the shortest edge is remade at" },
    { said: "--seed <n>", takes: "the sampler seed" },
    { said: "--no-persist", takes: "leave the image where it was written and file no page for it" },
  ],
  helpNotes: [
    "the resolution is the shortest edge in pixels rather than a factor, so a factor is worked out against the source's short side first.",
    "the host is the cluster where nothing names one, and naming the workstation opts into the card sitting in it.",
    "on the cluster the work is a Job and the image travels through the object store, and on the workstation it is a container reading a data directory.",
    "the environment holds where that data directory sits under `UPSCALE_HOME`.",
    "a run row is filed whether the remake finished or failed.",
  ],
  invariants: [
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
      statement: "The seed the recipe carries is used where nothing names one.",
    },
    {
      invariantKind: "departure",
      statement: "The image is written where the caller named it and nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "A run row is filed whether the remake finished or failed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here provisions the weights or starts the container.",
    },
  ],
} as const satisfies Command
