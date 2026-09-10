import type { Command } from "../../../../../command.page-type.types.ts"

export const temperEsoGenerateTypings = {
  id: "01a0685d-f8fa-7755-9f01-412ee9b28025",
  pageTypeSlug: "command",
  type: "command",
  slug: "temper-eso-generate-typings",
  definition: "the command writing the game's API declarations from the game's own documentation",
  code: "ts",
  changeKind: "change-mechanical",
  taking: [
    {
      said: "--code-root <path>",
      takes: "the checkout the declarations are written into",
    },
  ],
  helpNotes: [
    "the checkout defaults to what `CODE_ROOT` names, and to this repository where that names nothing.",
    "the documentation read is the `~/esoui` clone's `ESOUIDocumentation.txt`, which is Zenimax's and is vendored nowhere here.",
    "the opt-in manifest is the scope: the dump describes thousands of tokens and an addon wants a few hundred, so a token the manifest does not name is absent from the declarations.",
    "an enum a kept token names is kept too, and so is an object above a kept object.",
    "each written file carries the clone provenance line and the API version it was built from, which is what the freshness audit weighs.",
    "the five files land together as one commit through the mechanical change that writes a code file, which formats each body as it lands.",
    "a file the checkout already holds is left out of that change, so a run over unchanged documentation lands nothing.",
    "a clone that is not on this workstation refuses the call rather than writing thinner declarations.",
  ],
  invariants: [
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
      statement: "The declarations land as one mechanical change rather than written here.",
    },
    {
      invariantKind: "departure",
      statement: "A file the checkout already has is left out of that change.",
    },
    {
      invariantKind: "departure",
      statement: "The landing formats each body, so nothing here runs a formatter.",
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
} as const satisfies Command
