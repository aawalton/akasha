import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutReading = {
  id: "01a057f9-873e-7390-9635-32012c10d149",
  type: "page-type/module",
  slug: "readout-reading",
  definition: "how code keeps the last number a readout takes in a file in the folder of its page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A number is kept in the file beside the readout the number was taken for.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A readout is found by its page naming what serves it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One readout asked of what no readout names, or several readouts name, is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number taken for a page that is nowhere is refused rather than kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number a readout takes never reaches the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file a number is kept in never leaves the machine that took the number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment a number was taken is kept beside that number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How fast a number falls with the clock is kept beside that number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number no one says falls with the clock falls at nothing an hour.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take naming a rate writes that rate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take naming no rate leaves the rate as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout whose number can fall names its rate on every take of that number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number replaces the number before that number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout with nothing beside that readout has taken no number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout answering nothing keeps the number that readout last took.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number in the file with one half alone is refused rather than taken as no number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The number a readout carries is read off the readout's own values.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The two halves a number is carried under are named here alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The values a number is written under are answered here rather than spelled by a writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number of the open block kept from an earlier day is no number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number of the day row kept from an earlier day is read until the new day's take lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number is of a day only where its readout states what of the day it is made from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day a number is of is the ESO day it was taken in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Values with neither half have no number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Values with one half alone have no number.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here takes a number.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides when a number is due.",
    },
  ],
  createdAt: "2026-08-31T13:19:26.014Z",
  updatedAt: "2026-10-30T17:30:22.082Z",
} as const satisfies Module
