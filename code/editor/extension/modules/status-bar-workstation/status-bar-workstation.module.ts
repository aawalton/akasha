import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const statusBarWorkstation = {
  id: "01a0a06d-c7bc-75e2-b14d-994b4e770155",
  type: "module",
  slug: "status-bar-workstation",
  definition: "the processor and memory figures the status bar draws of the workstation's load",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A figure is handed in rather than read here.",
    },
    {
      invariantKind: "departure",
      statement: "The processor figure is a share and the memory figure an amount.",
    },
    {
      invariantKind: "departure",
      statement: "A reading with neither figure is no reading rather than two figures of nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A reading with one figure keeps the other as no figure.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts a child process.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says how a figure is drawn.",
    },
  ],
} as const satisfies Module
