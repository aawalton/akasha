import type { Module } from "@akasha/code-system/module"

export const watcherExportTasks = {
  id: "01a06381-35cf-79d7-a1eb-ab708052aacb",
  pageTypeSlug: "module",
  slug: "watcher-export-tasks",
  definition:
    "the account's tasks written into the characters saved-variables file and into the addon's config",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The tasks block and the character priority block go into the same file.",
    },
    {
      invariantKind: "departure",
      statement: "The indent is read once for both blocks.",
    },
    {
      invariantKind: "departure",
      statement: "A task is keyed by its pgId where it has one and by its page id otherwise.",
    },
    {
      invariantKind: "departure",
      statement: "A task carries the game's character id rather than the character page's id.",
    },
    {
      invariantKind: "departure",
      statement: "A task row carrying no page id is left out.",
    },
    {
      invariantKind: "departure",
      statement: "No task at all leaves the saved-variables content unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "Only a task marked as awaiting sync is marked back once that task is exported.",
    },
    {
      invariantKind: "constraint",
      statement: "The config file is written only where a path is given and the run is for real.",
    },
    {
      invariantKind: "departure",
      statement: "An override row the completion package will not read is left out.",
    },
    {
      invariantKind: "departure",
      statement: "An override is grouped under the game's character id.",
    },
    {
      invariantKind: "departure",
      statement: "An override whose character has no game id is left out.",
    },
    {
      invariantKind: "departure",
      statement: "Everything reaching the network or a file may be handed in by the caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what a character's priority is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a file of its own.",
    },
  ],
} as const satisfies Module
