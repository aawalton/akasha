import type { Command } from "../command.page-type.ts"

export const seatMessaged = {
  id: "01a0780e-7f14-71fd-ac09-b12de342c207",
  pageTypeSlug: "command",
  slug: "seat-messaged",
  definition: "the command marking the persona at a seat as the one Alan wrote to last",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  positionals: [
    {
      name: "name",
      description: "the seat Alan wrote to",
      required: true,
    },
  ],
  helpNotes: [
    "the moment kept is the moment of the run rather than a moment the caller states.",
    "the value is kept beside the persona's page rather than in the commit.",
    "a seat holding no persona is refused rather than kept against nobody.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The persona marked is the persona the named seat states.",
    },
    {
      invariantKind: "departure",
      statement: "A name that is no seat is refused rather than kept against nobody.",
    },
    {
      invariantKind: "departure",
      statement: "A run states which persona was marked and at what moment.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the seat's work.",
    },
    {
      invariantKind: "absence",
      statement: "A run marks no persona but the named seat's persona.",
    },
  ],
} as const satisfies Command
