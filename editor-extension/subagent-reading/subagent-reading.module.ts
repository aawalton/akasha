import type { Module } from "../../code-system/modules/module.page-type.ts"

export const subagentReading = {
  id: "01a0686b-bfe9-77b0-aecf-6c31f4ae928a",
  pageTypeSlug: "module",
  slug: "subagent-reading",
  definition:
    "the subagents running under each seat, folded out of the bytes each transcript gained",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A transcript is folded from where the last fold stopped rather than from its first byte.",
    },
    {
      invariantKind: "departure",
      statement: "A file that no longer reads the way it did is folded again from its first byte.",
    },
    {
      invariantKind: "departure",
      statement: "A fold starting again drops what the old fold knew rather than merging into it.",
    },
    {
      invariantKind: "departure",
      statement: "A cursor already naming another file keeps its state and consults no book.",
    },
    {
      invariantKind: "departure",
      statement: "The banked offset, the anchor and the state are taken together or not at all.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent is descended into five deep and no deeper.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent naming no id it runs under is descended into no further.",
    },
    {
      invariantKind: "departure",
      statement: "A cursor no read touched is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The fold is banked at most once in ten seconds.",
    },
    {
      invariantKind: "departure",
      statement: "A bank that fails costs a refold rather than a wrong row.",
    },
    {
      invariantKind: "departure",
      statement: "The bank is awaited, so a host reading the fleet once and exiting still banks.",
    },
    {
      invariantKind: "absence",
      statement: "A line that is no JSON object changes nothing.",
    },
  ],
} as const satisfies Module
