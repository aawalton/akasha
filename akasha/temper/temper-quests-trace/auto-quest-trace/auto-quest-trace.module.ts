import type { Module } from "@akasha/code-system/module"

export const autoQuestTrace = {
  id: "01a06098-98a3-7c4d-b67f-e657dc450ff5",
  pageTypeSlug: "module",
  slug: "auto-quest-trace",
  definition: "the dialogue choices the quest addon made, read back and checked",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An entry declares its kind before anything else in that entry is read.",
    },
    {
      invariantKind: "departure",
      statement: "An entry carrying a field its kind never names is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A saved-variables table carrying a field beyond the trace is kept as found.",
    },
    {
      invariantKind: "departure",
      statement: "A trace the addon never wrote reads back as no entries.",
    },
    {
      invariantKind: "departure",
      statement: "A moment here is the second count the addon wrote.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
