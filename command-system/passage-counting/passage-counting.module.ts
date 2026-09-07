import type { Module } from "@akasha/code/module"

export const passageCounting = {
  id: "01a07bd4-e969-78b4-bff1-0256ba1a2c30",
  pageTypeSlug: "module",
  slug: "passage-counting",
  definition: "how many times a literal passage is in a body",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A passage is matched as the characters that passage holds rather than as a pattern.",
    },
    {
      invariantKind: "departure",
      statement:
        "The search for the next occurrence opens where the occurrence just counted closes.",
    },
    {
      invariantKind: "departure",
      statement: "A second occurrence overlapping the first is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A body holding the passage nowhere is counted as zero occurrences.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "gap",
      statement: "An empty passage is refused by the caller rather than counted here.",
    },
  ],
} as const satisfies Module
