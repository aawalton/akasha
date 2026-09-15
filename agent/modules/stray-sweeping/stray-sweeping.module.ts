import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const straySweeping = {
  id: "01a09ced-1a65-7dd9-a620-2ed6bac65b03",
  type: "page-type/module",
  slug: "stray-sweeping",
  definition: "every stray ended, and each ending said with the times that process took",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The scan, the reading, the times, the ending and the set last said are handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is asked about the processes the scan answered rather than its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process's times are read before that process is ended.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A live descendant stating no acting agent of its own is taken with the process it hangs off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A descendant stating an acting agent of its own is left to the reading rather than taken.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process reached twice is ended once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A process is signalled through the module asking a process to end and then making it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A stray and a stray's line are said the same way here and by the command naming strays.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The subagents a sweep could not read are said only where that set differs from the set handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A set that gains a subagent, loses one, or empties differs, and is said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A set handed in that will not be read reads as no subagent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every ending is said whatever that set does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The set a sweep could not read is written where it is read from again.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a transcript or a page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No memory and no processor is read to choose what to end.",
    },
  ],
} as const satisfies Module
