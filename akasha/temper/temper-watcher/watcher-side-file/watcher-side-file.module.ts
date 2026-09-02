import type { Module } from "@akasha/code-system/module"

export const watcherSideFile = {
  id: "01a06381-35cf-7b8f-8505-ad3ea6755991",
  pageTypeSlug: "module",
  slug: "watcher-side-file",
  definition: "the inventory config file put beside the addon only where its content changed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The values the file needs are named in one list.",
    },
    {
      invariantKind: "departure",
      statement: "A build told nothing for a needed value is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names every value it was told nothing for.",
    },
    {
      invariantKind: "departure",
      statement: "A file already holding what is wanted is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A file that will not open counts as holding something else.",
    },
    {
      invariantKind: "departure",
      statement: "The hash answered is of what was wanted rather than of what the file holds.",
    },
    {
      invariantKind: "departure",
      statement: "A hash is taken by the module that tells a self-write from a game write.",
    },
    {
      invariantKind: "departure",
      statement: "A write goes through the atomic write the retry module carries.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what reads and writes the file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what any value should be.",
    },
  ],
} as const satisfies Module
