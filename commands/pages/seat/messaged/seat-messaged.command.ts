import type { Command } from "../../../command.page-type.types.ts"

export const seatMessaged = {
  id: "01a0780e-7f14-71fd-ac09-b12de342c207",
  pageTypeSlug: "command",
  type: "command",
  slug: "seat-messaged",
  definition: "the command counting a message Alan wrote to the persona at a seat",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [{ said: "<name>", takes: "the seat Alan wrote to" }],
  helpNotes: [
    "the moment kept is the moment of the run rather than a moment the caller states.",
    "the values are kept beside the persona's page and the day's page rather than in the commit.",
    "a seat holding no persona is refused rather than kept against nobody.",
    "a hundred messages is one point, and `akasha refresh personas` rebuilds the days before today.",
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
      invariantKind: "departure",
      statement: "A run raises that persona's count on today's day by one.",
    },
    {
      invariantKind: "departure",
      statement: "A run keeps her points for today from the count that day now carries.",
    },
    {
      invariantKind: "departure",
      statement: "A day with no page filed under it leaves the mark kept and earns no point.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with no persona is refused in the same words as a name that is no seat.",
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
