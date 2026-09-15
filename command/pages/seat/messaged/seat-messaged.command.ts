import type { Command } from "akasha/command/command.page-type.types.ts"

export const seatMessaged = {
  id: "01a0780e-7f14-71fd-ac09-b12de342c207",
  type: "command",
  slug: "seat-messaged",
  definition: "the command counting a message Alan wrote to the persona at a seat",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The moment kept is the moment of the run rather than a moment the caller states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The values are kept beside the persona's page and the day's page rather than committed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hundred messages is one point.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The persona marked is the persona the named seat states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name that is no seat is refused rather than kept against nobody.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run states which persona was marked and at what moment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run raises that persona's count on today's day by one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run keeps her points for today from the count that day now carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day with no page filed under it leaves the mark kept and earns no point.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat with no persona is refused in the same words as a name that is no seat.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the seat's work.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run marks no persona but the named seat's persona.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run that stopped part way is refused naming each mark it kept before it stopped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that stopped before it kept a mark is refused as the fault alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat index that would not read is refused here rather than left unanswered.",
    },
  ],
  name: "messaged",
  arguments: [{ argument: "argument/seat", required: true, saidAs: "word" }],
} as const satisfies Command
