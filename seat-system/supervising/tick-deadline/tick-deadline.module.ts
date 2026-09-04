import type { Module } from "@akasha/code-system/module"

export const tickDeadline = {
  id: "01a06885-0bab-7000-97bd-58c9925eb768",
  pageTypeSlug: "module",
  slug: "tick-deadline",
  definition: "the ceiling a single tick of a standing service runs under",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tick that outruns its ceiling loses the race rather than running on unwatched.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling reached is told apart from any other throw by its own error name.",
    },
    {
      invariantKind: "departure",
      statement: "A tick asked for after the stop was asked is refused before it starts.",
    },
    {
      invariantKind: "departure",
      statement: "A timer left behind holds the process up, so every race clears its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "A listener left on the signal outlives the tick, so every race takes its own off.",
    },
  ],
} as const satisfies Module
