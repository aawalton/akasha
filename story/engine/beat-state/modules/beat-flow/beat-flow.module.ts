import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const beatFlow = {
  id: "01a17edb-2b08-72ae-8f44-dde0cc303da6",
  type: "page-type/module",
  slug: "beat-flow",
  definition: "which step each beat of a turn is ready for, worked out from the turn's beats file",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Which step a beat still needs is read from the turn's beats file alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A beat is ready for a step once the step before filled it and the step filled the beat before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step has filled a beat once its part is on that beat's line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Numbers follow the game master's event, prose follows numbers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Memory and pictures each follow prose, and neither waits on the other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master states every beat of a turn at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A beat holding issues is refused, and is ready for no step until it is stated again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refused beat is ready for the game master, the earliest refused beat first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat is shown once its numbers and its prose are both on its line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A step reaches a turn's first beat only once it has filled every beat of the turn before.",
    },
  ],
  createdAt: "2026-10-27T19:34:15.047Z",
  updatedAt: "2026-10-27T20:26:52.073Z",
} as const satisfies Module
