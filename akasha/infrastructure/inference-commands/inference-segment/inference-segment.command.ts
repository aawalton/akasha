import type { Command } from "@akasha/command-system/command"

export const inferenceSegment = {
  id: "01a0685e-fd50-7faf-a163-46fe4ccb9461",
  pageTypeSlug: "command",
  slug: "inference-segment",
  definition: "the command parting an image's foreground from its background as an alpha matte",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "<image>", takes: "the image matted, said without a flag" },
    { said: "--image <path>", takes: "that image said as a flag instead" },
    { said: "--matte-out <path>", takes: "where the eight-bit alpha matte is written" },
    { said: "--model <name>", takes: "the rembg session the matte is cut with" },
    { said: "--cutout", takes: "also write the foreground on transparency" },
    { said: "--cutout-out <path>", takes: "where that cutout is written" },
    { said: "--flatten <color>", takes: "also write the foreground on a solid color" },
    { said: "--flatten-out <path>", takes: "where that flattened image is written" },
    { said: "--alpha-matting", takes: "refine the matte's edges, which costs more" },
    { said: "--timeout <s>", takes: "how many seconds the wait on the pool runs for" },
  ],
  helpNotes: [
    "the image is said without a flag or as `--image`, and one call names one image.",
    "the matte is always written, and the cutout and the flatten are written beside it only when asked.",
    "naming where a cutout goes asks for the cutout.",
    "a path nothing named sits beside the matte, under the matte's own name and a suffix.",
    "a color is said as a hex triple or as three numbers separated by commas.",
    "the timeout counts the cop's swap and the cold model load as well as the cut.",
    "one run row is filed for the call rather than one for each image written.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The matte is written on every call that finishes.",
    },
    {
      invariantKind: "departure",
      statement: "Naming where a cutout goes asks for the cutout.",
    },
    {
      invariantKind: "departure",
      statement: "A path nothing named sits beside the matte under a suffix.",
    },
    {
      invariantKind: "departure",
      statement:
        "The cutout and the flatten are each cut afresh rather than derived from the matte.",
    },
    {
      invariantKind: "departure",
      statement: "One run row is filed for the call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes the segment service resident.",
    },
  ],
} as const satisfies Command
