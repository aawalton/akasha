import type { Module } from "@akasha/code-system/module"

export const triageFanoutAttribution = {
  id: "01a06885-0bab-7003-aced-481240f5e00b",
  pageTypeSlug: "module",
  slug: "triage-fanout-attribution",
  definition: "which workspace and file a fail signal in a shared log belongs to",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line carrying a producer tag is charged to the workspace the tag names.",
    },
    {
      invariantKind: "departure",
      statement:
        "An untagged line in a log many workers shared is declined rather than charged to a guess.",
    },
    {
      invariantKind: "departure",
      statement: "An untagged line in a log one worker wrote is charged to the section it fell in.",
    },
  ],
} as const satisfies Module
