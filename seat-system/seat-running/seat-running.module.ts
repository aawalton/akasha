import type { Module } from "@akasha/code-system/module"

export const seatRunning = {
  id: "01a069d0-78a2-7758-8c1f-002d4bc214c2",
  pageTypeSlug: "module",
  slug: "seat-running",
  definition: "stating what a seat is, so a compaction cannot take it away",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The command reads the arguments and writes the answer, and the function it calls does neither.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stating that is refused is answered with the refusal's words rather than ended.",
    },
    {
      invariantKind: "departure",
      statement: "An answer carries the bytes the command writes, so the shell composes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The command and this file's own entry point share one shell over the stating.",
    },
    {
      invariantKind: "absence",
      statement: "The stating function reaches no stream and no exit code.",
    },
  ],
} as const satisfies Module
