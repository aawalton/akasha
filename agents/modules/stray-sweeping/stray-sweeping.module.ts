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
      statement: "The scan, the reading, the times and the ending are handed in.",
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
      invariantKind: "absence",
      statement: "Nothing here reads a transcript or a page.",
    },
    {
      invariantKind: "absence",
      statement: "No memory and no processor is read to choose what to end.",
    },
  ],
} as const satisfies Module
