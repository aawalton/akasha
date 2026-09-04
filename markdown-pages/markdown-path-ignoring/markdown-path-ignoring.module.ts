import type { Module } from "@akasha/code-system/module"

export const markdownPathIgnoring = {
  id: "01a06895-1d00-7000-8d4a-9ed7c3d5b8b2",
  pageTypeSlug: "module",
  slug: "markdown-path-ignoring",
  definition: "which paths under a checkout git ignores",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A checkout git cannot answer for returns null rather than every path.",
    },
  ],
} as const satisfies Module
