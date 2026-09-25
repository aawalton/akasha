import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const observerSlot = {
  id: "01a062be-c8b4-7001-8e37-6c3dfe1b34d0",
  type: "page-type/module",
  slug: "observer-slot",
  definition: "the stream a connection has in flight, and the end that runs once",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot has the observer of the stream in flight or has nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot with nothing in it is made here rather than written out by each caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot's end ends the stream that slot has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot with no end is a slot nothing ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wrapped end runs the end handed in on the first call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wrapped end called again runs the end handed in no further.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wrapped end is one-shot for the life of that wrapper.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two wrappers over the one end run that end twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wrapped end is marked as run before the end handed in is called.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A caller putting a new observer in the slot ends the observer being replaced.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here ends a stream on its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot takes an observer already terminated, and ending it again writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An end that throws is left marked as run.",
    },
  ],
} as const satisfies Module
