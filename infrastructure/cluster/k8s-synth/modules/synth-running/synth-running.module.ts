import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const synthRunning = {
  id: "01a06810-0b68-7038-a682-a9d1287b3622",
  type: "page-type/module",
  slug: "synth-running",
  definition: "a command line's synth pass",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Asking to check and to write together is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Naming a root more than once is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A package filter matching no synth file is refused rather than answered empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run answers a code rather than ending the process itself.",
    },
  ],
  createdAt: "2026-09-03T16:17:57.096Z",
  updatedAt: "2026-09-22T13:43:11.000Z",
} as const satisfies Module
