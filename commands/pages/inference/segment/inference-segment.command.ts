import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceSegment = {
  id: "01a0685e-fd50-7faf-a163-46fe4ccb9461",
  type: "command",
  slug: "inference-segment",
  definition: "the command parting an image's foreground from its background as an alpha matte",
  code: "ts",
  test: "ts",
  taking: [
    { said: "--cutout", takes: "also write the foreground on transparency" },
    { said: "--cutout-out <path>", takes: "where that cutout is written" },
    {
      said: "--flatten <color>",
      takes:
        "also write the foreground on a solid color, said `#RRGGBB` or as numbers parted by commas",
    },
    { said: "--flatten-out <path>", takes: "where that flattened image is written" },
    { said: "--alpha-matting", takes: "refine the matte's edges, which costs more" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One call names one image.",
    },
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
      invariantKind: "departure",
      statement: "Each file this writes is named as soon as that file reaches the disk.",
    },
    {
      invariantKind: "departure",
      statement: "A call that threw part way names those files in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The writing this runs is handed in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes the segment service resident.",
    },
  ],
  name: "segment",
  arguments: [
    { argument: "argument/rembg-session" },
    { argument: "argument/image", required: true, saidAs: "flag-or-word" },
    { argument: "argument/timeout" },
    { argument: "argument/matte-out" },
  ],
} as const satisfies Command
