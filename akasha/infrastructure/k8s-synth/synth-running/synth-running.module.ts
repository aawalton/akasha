import type { Module } from "@akasha/code-system/module"

export const synthRunning = {
  id: "01a06810-0b68-7038-a682-a9d1287b3622",
  pageTypeSlug: "module",
  slug: "synth-running",
  definition: "the synth pass a command line asks for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Asking to check and to write together is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Naming a root more than once is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A package filter matching no synth file is refused rather than answered empty.",
    },
    {
      invariantKind: "departure",
      statement: "A run answers a code rather than ending the process itself.",
    },
  ],
} as const satisfies Module
