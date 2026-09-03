import type { Module } from "@akasha/code-system/module"

export const seatReviveLaunchDecide = {
  id: "01a0686d-9d5e-700b-a38f-fbe2284f5f2d",
  pageTypeSlug: "module",
  slug: "seat-revive-launch-decide",
  definition: "whether a seat coming back up resumes its old session or starts a fresh one",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat with no session to resume is spawned rather than revived.",
    },
    {
      invariantKind: "departure",
      statement: "A seat being spawned falls back to its boot prompt where nothing else is stated.",
    },
    {
      invariantKind: "departure",
      statement: "A seat being revived is handed no boot prompt, having already been booted once.",
    },
    {
      invariantKind: "departure",
      statement: "Only a seat resuming a session needs its transcript materialised first.",
    },
  ],
} as const satisfies Module
