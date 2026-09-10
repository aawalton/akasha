import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const launchFlags = {
  id: "01a06964-d998-7def-b199-95bb54b08519",
  pageTypeSlug: "module",
  type: "module",
  slug: "launch-flags",
  definition:
    "the harness flags every agent launch passes, read off the launch-flags settings page",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where the settings page sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "departure",
      statement: "The settings body is the file beside that page rather than a second path.",
    },
  ],
} as const satisfies Module
