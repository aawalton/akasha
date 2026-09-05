import type { Module } from "@akasha/code-system/module"

export const mcpDisableReconcile = {
  id: "01a0686c-f06b-700a-b0b5-cfa06c6e47bf",
  pageTypeSlug: "module",
  slug: "mcp-disable-reconcile",
  definition: "a harness setting that switched a declared tool server off, undone before launch",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A declared server switched off in the harness is switched back on.",
    },
    {
      invariantKind: "departure",
      statement: "A server switched off that nothing declares is left switched off.",
    },
    {
      invariantKind: "departure",
      statement: "Only the project whose real path is the launch directory is touched.",
    },
    {
      invariantKind: "departure",
      statement: "A configuration this module cannot read is left alone rather than rewritten.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing to clear is no plan rather than a plan that changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A configuration is rewritten keeping whether it ended in a newline.",
    },
  ],
} as const satisfies Module
