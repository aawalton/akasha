import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const estimateMarks = {
  id: "01a05b55-e06e-753e-9209-b70e874274d3",
  type: "page-type/module",
  slug: "estimate-marks",
  definition: "when each sentence starts, worked out from how long each rendered piece runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A start is placed by how far into its piece the sentence begins.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sentence is taken to run at an even rate across the piece with that sentence.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "As many durations as pieces are given or nothing is answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sentence starting past the last piece is left unmarked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading begun partway has the marks of the whole rather than of the part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Durations nobody measured are guessed from how many characters a piece holds.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here listens to the audio this module marks.",
    },
  ],
} as const satisfies Module
