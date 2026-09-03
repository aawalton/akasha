import type { Module } from "@akasha/code-system/module"

export const pipelineSeqs = {
  id: "01a068e0-6ae3-7cfa-89e5-c4870dd761f0",
  pageTypeSlug: "module",
  slug: "pipeline-seqs",
  definition: "the next seq a new pipeline page takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The counter stands on the page type page rather than in a file of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A page type no index holds is refused by name rather than guessed at a path.",
    },
    {
      invariantKind: "departure",
      statement: "A seq is handed out under a lock held on the page type file.",
    },
    {
      invariantKind: "gap",
      statement: "Every page type minting a seq is named here rather than anywhere general.",
    },
  ],
} as const satisfies Module
