import type { Module } from "@akasha/code-system/module"

export const scrollableMenuDebugLoggingToggle = {
  id: "01a06275-c447-7d33-a40a-ab1f81aa2b8b",
  pageTypeSlug: "module",
  slug: "scrollable-menu-debug-logging-toggle",
  definition: "the flip of the debug and verbose-debug switches on the library debug table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The toggle loads the logger on first use rather than at library load.",
    },
    {
      invariantKind: "constraint",
      statement: "Verbose logging is reported only while plain debugging is on.",
    },
    {
      invariantKind: "absence",
      statement: "The toggle persists nothing across sessions.",
    },
  ],
} as const satisfies Module
