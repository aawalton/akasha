import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperEsoGenerateTypings = {
  id: "01a0685d-f8fa-7755-9f01-412ee9b28025",
  type: "command",
  slug: "temper-eso-generate-typings",
  definition: "the command writing the game's API declarations from the game's own documentation",
  code: "ts",
  taking: [
    {
      said: "--code-root <path>",
      takes: "the checkout the declarations are written into",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The documentation read is the `~/esoui` clone's `ESOUIDocumentation.txt`.",
    },
    {
      invariantKind: "departure",
      statement:
        "The opt-in manifest rather than the documentation decides which tokens are declared.",
    },
    {
      invariantKind: "departure",
      statement: "An enum a kept token names is kept.",
    },
    {
      invariantKind: "departure",
      statement: "An object above a kept object is kept.",
    },
    {
      invariantKind: "departure",
      statement:
        "A written file names the command that wrote that file and the API version that file was built from.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout written into is named on the call.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call naming no checkout writes into what `CODE_ROOT` names, else this repository.",
    },
    {
      invariantKind: "departure",
      statement: "The declarations land as one mechanical change rather than written here.",
    },
    {
      invariantKind: "departure",
      statement: "A file the checkout already has is left out of that change.",
    },
    {
      invariantKind: "departure",
      statement: "The landing formats each body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs a formatter.",
    },
    {
      invariantKind: "departure",
      statement: "A clone this workstation does not carry refuses the call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the clone.",
    },
    {
      invariantKind: "gap",
      statement: "The opt-in manifest naming which tokens are kept is in akasha.",
    },
  ],
  name: "typings",
} as const satisfies Command
