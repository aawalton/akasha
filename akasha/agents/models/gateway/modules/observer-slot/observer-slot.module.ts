import type { Module } from "@akasha/code-system/module"

export const observerSlot = {
  id: "01a062be-c8b4-7001-8e37-6c3dfe1b34d0",
  pageTypeSlug: "module",
  slug: "observer-slot",
  definition: "the one stream a connection has in flight, and the end that runs once",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slot holds the observer of the stream in flight or holds nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A slot's end is what ends the stream that slot holds.",
    },
    {
      invariantKind: "departure",
      statement: "A slot carrying no end is a slot nothing ends.",
    },
    {
      invariantKind: "departure",
      statement: "A wrapped end runs the end handed in on the first call.",
    },
    {
      invariantKind: "departure",
      statement: "A wrapped end called again runs the end handed in no further.",
    },
    {
      invariantKind: "departure",
      statement: "A wrapped end is one-shot for the life of that wrapper.",
    },
    {
      invariantKind: "departure",
      statement: "Two wrappers over the one end run that end twice.",
    },
    {
      invariantKind: "departure",
      statement: "A wrapped end is marked as run before the end handed in is called.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller putting a new observer in the slot ends the observer being replaced.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here ends a stream on its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes the disk.",
    },
    {
      invariantKind: "gap",
      statement: "A slot takes an observer already terminated.",
    },
    {
      invariantKind: "gap",
      statement: "An end that throws is left marked as run.",
    },
  ],
} as const satisfies Module
