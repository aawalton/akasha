import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const debugLoggerTaggedLogger = {
  id: "01a06061-4092-7c03-8889-a341e67a2144",
  type: "page-type/module",
  slug: "debug-logger-tagged-logger",
  definition: "a logger object with a tag, its sub-taggings and its level overrides",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A logger has the tag handed in at its making.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sub-logger tag is the parent tag and the new tag parted by a slash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A logger switched off writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty tag is refused.",
    },
  ],
} as const satisfies Module
