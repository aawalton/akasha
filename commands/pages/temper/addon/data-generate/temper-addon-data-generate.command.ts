import type { Command } from "../../../../command.page-type.types.ts"

export const temperAddonDataGenerate = {
  id: "01a0603c-c1c9-7a51-951e-6b45cf45c084",
  pageTypeSlug: "command",
  type: "command",
  slug: "temper-addon-data-generate",
  definition: "the command writing the addon data files from the pages with their source",
  code: "ts",
  changeKind: "change-mechanical",
  taking: [
    {
      said: "--code-root <path>",
      takes: "the checkout the game data is read from and the files are written into",
    },
  ],
  helpNotes: [
    "the checkout defaults to what `CODE_ROOT` names, and to this repository where that names nothing.",
    "the emitted data is ruled against the hand-written equipment mappings, and a difference refuses the call.",
  ],
  invariants: [
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
  ],
} as const satisfies Command
