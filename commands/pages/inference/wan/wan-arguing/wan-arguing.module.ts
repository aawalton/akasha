import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const wanArguing = {
  id: "01a072fa-322b-78f2-bd8b-a4fa1b843b1d",
  type: "module",
  slug: "wan-arguing",
  definition: "the arguments a wan call was made with, read off the command line",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The flags a command takes are handed in rather than known here.",
    },
    {
      invariantKind: "departure",
      statement: "A flag the command does not take is refused rather than passed along.",
    },
    {
      invariantKind: "departure",
      statement: "A flag said twice is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A flag with a value and given no value is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A flag ending in `-file` reads its value from the path that flag names.",
    },
    {
      invariantKind: "departure",
      statement: "A default the command has fills a flag nothing said.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path is read against the repository root rather than the folder the call was made from.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the GPU or the disk past a flag routed through a path.",
    },
  ],
} as const satisfies Module
