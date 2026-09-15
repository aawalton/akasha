import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutReading = {
  id: "01a057f9-873e-7390-9635-32012c10d149",
  type: "page-type/module",
  slug: "readout-reading",
  definition: "the reading a readout last took, kept beside its page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading is kept in the file beside the readout the reading was taken for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where a readout's page sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout the index names no page for is refused rather than answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading taken for a page that is nowhere is refused rather than kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading never reaches the commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file a reading is kept in never leaves the machine that took the reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The moment a reading was taken is kept beside its value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How fast a reading falls with the clock is kept beside its value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading no one says falls with the clock falls at nothing an hour.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A take naming a rate writes that rate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A take naming no rate leaves the rate as it is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout whose reading can fall names its rate on every take of that reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading replaces the reading before that reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout with nothing beside that readout has taken no reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A readout whose take answered nothing carries the moment it began answering nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout whose take answered a number carries no such moment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout answering nothing again leaves that moment where it already was.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That moment is taken away rather than blanked when a number is answered again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing is written for a readout whose answering is what it already was.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key that moment is carried under is named here alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A reading in the file with one half alone is refused rather than read as no reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading a readout carries is read off the readout's own values.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The two halves a reading is carried under are named here alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The values a reading is written under are answered here rather than spelled by a writer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Values with neither half have no reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Values with one half alone have no reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading is the number a readout is given to show.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes a reading.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
