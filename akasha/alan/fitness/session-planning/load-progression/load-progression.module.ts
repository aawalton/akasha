import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const loadProgression = {
  id: "01a0685e-89d5-707e-b214-ac12473fc5af",
  pageTypeSlug: "module",
  slug: "load-progression",
  definition: "what a movement is prescribed next, read from the last session of it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A movement with no working set logged is introduced rather than progressed.",
    },
    {
      invariantKind: "departure",
      statement: "The load worked at is the one most of the sets were at.",
    },
    {
      invariantKind: "departure",
      statement: "Reps are beaten to the top of the range before the load moves.",
    },
    {
      invariantKind: "departure",
      statement: "The load moves to the next rung of the ladder rather than by an amount.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rung that would drop the reps below the range floor is refused and the reps extend instead.",
    },
    {
      invariantKind: "departure",
      statement: "A movement at the top of its ladder extends its reps and gains a set.",
    },
    {
      invariantKind: "departure",
      statement: "A movement carrying no load extends its reps and gains a set.",
    },
    {
      invariantKind: "departure",
      statement: "Every decision states in words why it was reached.",
    },
  ],
} as const satisfies Module
