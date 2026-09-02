import type { Module } from "@akasha/code-system/module"

export const debugLoggerTaggedLogger = {
  id: "01a06061-4092-7c03-8889-a341e67a2144",
  pageTypeSlug: "module",
  slug: "debug-logger-tagged-logger",
  definition: "a logger object carrying one tag, its sub-taggings and its level overrides",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A logger carries the tag handed in at its making.",
    },
    {
      invariantKind: "departure",
      statement: "A sub-logger tag is the parent tag and the new one parted by a slash.",
    },
    {
      invariantKind: "departure",
      statement: "A logger switched off writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An empty tag is refused.",
    },
  ],
} as const satisfies Module
