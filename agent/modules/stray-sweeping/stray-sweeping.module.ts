import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const straySweeping = {
  id: "01a09ced-1a65-7dd9-a620-2ed6bac65b03",
  type: "module",
  slug: "stray-sweeping",
  definition: "every stray ended, and each ending said with the times that process took",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The scan, the reading, the times, the ending and the set last said are handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The reading is asked about the processes the scan answered rather than its own.",
    },
    {
      invariantKind: "departure",
      statement: "A process's times are read before that process is ended.",
    },
    {
      invariantKind: "departure",
      statement:
        "A live descendant stating no acting agent of its own is taken with the process it hangs off.",
    },
    {
      invariantKind: "departure",
      statement:
        "A descendant stating an acting agent of its own is left to the reading rather than taken.",
    },
    {
      invariantKind: "departure",
      statement: "A process reached twice is ended once.",
    },
    {
      invariantKind: "departure",
      statement:
        "A process is signalled through the module asking a process to end and then making it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stray and a stray's line are said the same way here and by the command naming strays.",
    },
    {
      invariantKind: "departure",
      statement:
        "The subagents a sweep could not read are said only where that set differs from the set handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A set that gains a subagent, loses one, or empties differs, and is said.",
    },
    {
      invariantKind: "departure",
      statement: "A set handed in that will not be read reads as no subagent.",
    },
    {
      invariantKind: "departure",
      statement: "Every ending is said whatever that set does.",
    },
    {
      invariantKind: "departure",
      statement: "The set a sweep could not read is written where it is read from again.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a transcript or a page.",
    },
    {
      invariantKind: "absence",
      statement: "No memory and no processor is read to choose what to end.",
    },
  ],
} as const satisfies Module
