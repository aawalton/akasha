import type { Module } from "@akasha/code-system/module"

export const addonDataWritesScribing = {
  id: "01a06837-d6c9-715c-b373-e4fc2572aa1c",
  pageTypeSlug: "module",
  slug: "addon-data-writes-scribing",
  definition: "the scribing section of a run's output, as the writes the section stands for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The script count is counted from the scripts temper holds rather than from pages.",
    },
    {
      invariantKind: "departure",
      statement: "A section takes the pages it is handed whether or not the section reads them.",
    },
  ],
} as const satisfies Module
