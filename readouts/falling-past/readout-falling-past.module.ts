import type { Module } from "@akasha/code/module"

export const readoutFallingPast = {
  id: "01a08c4b-05e4-78c6-a710-32b7ebf433be",
  pageTypeSlug: "module",
  type: "module",
  slug: "readout-falling-past",
  definition: "the instant a reading falling with the clock reaches the rung under it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rung answered for is the highest rung the reading is strictly over.",
    },
    {
      invariantKind: "departure",
      statement: "A reading sitting exactly on a rung is answered for the rung under that one.",
    },
    {
      invariantKind: "departure",
      statement: "A reading under every rung has no rung to reach and no instant.",
    },
    {
      invariantKind: "departure",
      statement: "A reading falling at nothing an hour never reaches a rung and has no instant.",
    },
    {
      invariantKind: "departure",
      statement: "The instant is counted from the moment the reading was taken, not from now.",
    },
    {
      invariantKind: "departure",
      statement:
        "The instant holding no `now` is what lets a tile count down one second per second.",
    },
    {
      invariantKind: "departure",
      statement: "An instant no date can hold is no instant rather than a throw.",
    },
    {
      invariantKind: "departure",
      statement: "A moment that reads as no instant is no instant rather than a throw.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A rate changing leaves an instant already sent wrong until the next reading is served.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the store or names a readout.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns a reading into a color.",
    },
  ],
} as const satisfies Module
