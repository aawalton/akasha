import type { Module } from "@akasha/code-system/module"

export const libSetsAutoAutocompletion = {
  id: "01a0623c-2df7-7942-a655-e30b89d4db2b",
  pageTypeSlug: "module",
  slug: "lib-sets-auto-autocompletion",
  definition: "the set-name completions offered under the set-preview slash commands",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Autocompletion only runs when LibSlashCommander is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A set name has its spaces replaced with a middle dot to make one token.",
    },
    {
      invariantKind: "departure",
      statement: "Each supported language gets its own set of slash command aliases.",
    },
  ],
} as const satisfies Module
