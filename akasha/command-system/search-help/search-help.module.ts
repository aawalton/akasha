import type { Module } from "@akasha/code-system/module"

export const searchHelp = {
  id: "01a0655b-02f0-7df5-9efc-3cb23b978638",
  pageTypeSlug: "module",
  slug: "search-help",
  definition: "what a reader is told about how a search chooses where to look and when to stop",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The help states the ceilings by reading them off the module that holds them.",
    },
    {
      invariantKind: "departure",
      statement: "The help names the read that records a reading rather than any older command.",
    },
    {
      invariantKind: "departure",
      statement: "Every default the search changes is named here with why the default is changed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides anything the search does.",
    },
  ],
} as const satisfies Module
