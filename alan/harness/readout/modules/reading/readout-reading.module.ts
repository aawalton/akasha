import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutReading = {
  id: "01a057f9-873e-7390-9635-32012c10d149",
  type: "page-type/module",
  slug: "readout-reading",
  definition: "the reading a readout last took, kept beside its page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is kept in the file beside the readout the reading was taken for.",
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
      statement: "A reading taken for a page that is nowhere is refused rather than kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading never reaches the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file a reading is kept in never leaves the machine that took the reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment a reading was taken is kept beside its value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How fast a reading falls with the clock is kept beside its value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading no one says falls with the clock falls at nothing an hour.",
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
      statement: "A readout whose reading can fall names its rate on every take of that reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading replaces the reading before that reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout with nothing beside that readout has taken no reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout answering nothing keeps the reading that readout last took.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading in the file with one half alone is refused rather than taken as no reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading a readout carries is read off the readout's own values.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The two halves a reading is carried under are named here alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The values a reading is written under are answered here rather than spelled by a writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Values with neither half have no reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Values with one half alone have no reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is the number a readout is given to show.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here takes a reading.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
