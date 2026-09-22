import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatToggles = {
  id: "01a0686b-bfe9-7373-bdd9-fdc5b5f86ce5",
  type: "page-type/module",
  slug: "seat-toggles",
  definition:
    "the steps a run, a restart or a reset asks of a seat, and the line by which a terminal attaches",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A running seat is stopped whatever place that seat has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stopped interactive seat is resumed into a terminal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stopped headless seat is revived without a terminal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reset attaches only where the seat has the interactive place.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A name that is no seat name is refused rather than put in a command line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat name is lower-case letters or digits or hyphens after a letter or digit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row's context value names whether the seat runs and where that seat is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat row is offered only the menu items the manifest hangs on the agent view.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a notice page or names a notice.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here performs a step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A restart cycles the seat in place, whatever place that seat has.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A restart attaches no terminal, the seat keeping the session it is in.",
    },
  ],
} as const satisfies Module
