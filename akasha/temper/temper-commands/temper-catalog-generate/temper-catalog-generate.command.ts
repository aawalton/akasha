import type { Command } from "@akasha/command-system/command"

export const temperCatalogGenerate = {
  id: "01a0603c-c1cc-7bf4-8076-7c63e2503141",
  pageTypeSlug: "command",
  slug: "temper-catalog-generate",
  definition:
    "the command writing one catalog tier's data file from a capture of the game's reference data",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "<tier>", takes: "which catalog tier is written" },
    { said: "--code-root <path>", takes: "the checkout the written file lands in" },
    { said: "--file <path>", takes: "the saved-variables file the capture is read from" },
  ],
  helpNotes: [
    "the file defaults to the tier's own capture in the workstation's live game install.",
    "a capture holding no catalog for the tier named is refused rather than written as empty.",
    "a capture stating no api version is refused, because the written file records which version it came from.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One call writes one tier.",
    },
    {
      invariantKind: "departure",
      statement: "A capture holding no catalog for the tier refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A capture stating no api version refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The written file records the api version its capture came from.",
    },
  ],
} as const satisfies Command
