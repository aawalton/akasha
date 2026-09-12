import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperAddonDataGenerate = {
  id: "01a0603c-c1c9-7a51-951e-6b45cf45c084",
  type: "command",
  slug: "temper-addon-data-generate",
  definition: "the command writing the addon data files from the pages with their source",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A call naming no checkout reads and writes what `CODE_ROOT` names, else this repository.",
    },
    {
      invariantKind: "departure",
      statement: "The data is written from the pages rather than from a captured file.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout written into is named on the call.",
    },
    {
      invariantKind: "departure",
      statement:
        "Emitted data differing from the hand-written equipment mappings refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A run that wrote before it threw says in its refusal what that run had written.",
    },
    {
      invariantKind: "departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
  ],
  name: "data-generate",
  arguments: [{ argument: "argument/code-root" }],
} as const satisfies Command
