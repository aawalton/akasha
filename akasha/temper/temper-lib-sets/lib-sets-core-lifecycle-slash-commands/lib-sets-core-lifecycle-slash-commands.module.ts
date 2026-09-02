import type { Module } from "@akasha/code-system/module"

export const libSetsCoreLifecycleSlashCommands = {
  id: "01a06231-8f1d-7ec6-9b08-f776872caaa1",
  pageTypeSlug: "module",
  slug: "lib-sets-core-lifecycle-slash-commands",
  definition: "the slash commands this library answers to and the chat text each one writes",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "The /sets and /ls aliases are only taken when no other addon has claimed the aliases.",
    },
  ],
} as const satisfies Module
