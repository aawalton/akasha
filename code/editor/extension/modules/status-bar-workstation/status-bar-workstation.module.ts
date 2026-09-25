import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const statusBarWorkstation = {
  id: "01a0a06d-c7bc-75e2-b14d-994b4e770155",
  type: "page-type/module",
  slug: "status-bar-workstation",
  definition: "the figures the status bar draws of the workstation's load",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A figure is handed in rather than read here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each figure is held under the wire key its readout states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading with no figure is no reading rather than figures of nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading with one figure keeps the other as no figure.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here starts a child process.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says how a figure is drawn.",
    },
  ],
} as const satisfies Module
