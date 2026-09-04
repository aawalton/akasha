import type { Module } from "@akasha/code-system/module"

export const markdownPageFault = {
  id: "01a0689a-3192-7000-90d5-3640bdec1fe7",
  pageTypeSlug: "module",
  slug: "markdown-page-fault",
  definition: "noting a file that matches a page glob and does not read as a page",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file that matches a glob and reads as no page is noted rather than counted.",
    },
  ],
} as const satisfies Module
