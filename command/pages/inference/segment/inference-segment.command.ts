import type { Command } from "akasha/command/command.page-type.types.ts"

export const inferenceSegment = {
  id: "01a0685e-fd50-7faf-a163-46fe4ccb9461",
  type: "command",
  slug: "inference-segment",
  definition: "the command parting an image's foreground from its background as an alpha matte",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One call names one image.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The matte is written on every call that finishes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Naming where a cutout goes asks for the cutout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path nothing named sits beside the matte under a suffix.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The cutout and the flatten are each cut afresh rather than derived from the matte.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One run row is filed for the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each file this writes is named as soon as that file reaches the disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call that threw part way names those files in its refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The writing this runs is handed in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here makes the segment service resident.",
    },
  ],
  name: "segment",
  arguments: [
    { argument: "argument/rembg-session" },
    { argument: "argument/image", required: true, saidAs: "flag-or-word" },
    { argument: "argument/timeout" },
    { argument: "argument/matte-out" },
    { argument: "argument/cutout" },
    { argument: "argument/cutout-out" },
    { argument: "argument/flatten" },
    { argument: "argument/flatten-out" },
    { argument: "argument/alpha-matting" },
  ],
} as const satisfies Command
