import type { Module } from "../../code-system/module/module.page-type.ts"

export const indexStamp = {
  id: "01a04de3-e304-7fef-8bb0-6f9d46ccea03",
  pageTypeSlug: "module",
  slug: "index-stamp",
  definition: "the commit the index was built from",
  code: "ts",
  test: "ts",
  design: [
    {
      invariantKind: "departure",
      statement: "The stamp names the commit the index was built from.",
    },
    {
      invariantKind: "departure",
      statement: "The stamp names the paths settled since that commit.",
    },
    {
      invariantKind: "departure",
      statement: "A path the stamp names is not claimed to match the commit it names.",
    },
    {
      invariantKind: "departure",
      statement: "An index carrying no stamp describes no commit.",
    },
    {
      invariantKind: "departure",
      statement: "A stamp is written whole, never appended to.",
    },
    {
      invariantKind: "departure",
      statement: "A rebuild stamps every path the worktree has changed.",
    },
  ],
  intent: [
    {
      invariantKind: "gap",
      statement: "No command rebuilds the index, so a stale stamp is cleared by hand.",
    },
  ],
} as const satisfies Module
