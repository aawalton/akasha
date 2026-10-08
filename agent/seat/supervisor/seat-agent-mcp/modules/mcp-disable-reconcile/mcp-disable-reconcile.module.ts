import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mcpDisableReconcile = {
  id: "01a0686c-f06b-700a-b0b5-cfa06c6e47bf",
  type: "page-type/module",
  slug: "mcp-disable-reconcile",
  definition: "a harness setting that switched a declared tool server off, undone before launch",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A declared server switched off in the harness is switched back on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A server switched off that nothing declares is left switched off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the project whose real path is the launch directory is touched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A configuration this module cannot read is left alone rather than rewritten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing to clear is no plan rather than a plan that changes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A configuration is rewritten keeping whether that configuration ended in a newline.",
    },
  ],
  createdAt: "2026-09-03T17:59:25.035Z",
  updatedAt: "2026-09-24T17:19:16.000Z",
} as const satisfies Module
