import type { Module } from "@akasha/code-system/module"

export const scrollableMenuConstantsIndex = {
  id: "01a06275-c446-7ea2-9bcd-f88189f54a12",
  pageTypeSlug: "module",
  slug: "scrollable-menu-constants-index",
  definition: "the bare import list covering the three constant modules",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A list of bare imports is used in place of any re-export.",
    },
    {
      invariantKind: "constraint",
      statement: "The order of the imports is the order the constant tables are built in.",
    },
    {
      invariantKind: "absence",
      statement: "The file declares no value of its own.",
    },
  ],
} as const satisfies Module
