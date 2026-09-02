import type { Module } from "@akasha/code-system/module"

export const watcherImportCompanions = {
  id: "01a06381-35cf-7e59-9fb8-159808653255",
  pageTypeSlug: "module",
  slug: "watcher-import-companions",
  definition: "the companion build hashes an addon saved, read back out and named, one page each",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The companions table is read out of the first account-wide table in the file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A companions table written as a lua array is read as a record whose first key is `1`.",
    },
    {
      invariantKind: "departure",
      statement: "An entry holding no build hash as text is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A definition id no companion in the table carries is reported and left out.",
    },
    {
      invariantKind: "departure",
      statement: "A hash that will not decode is reported against its companion and left out.",
    },
    {
      invariantKind: "departure",
      statement: "A build name is the companion's name and the name of its base roles sorted.",
    },
    {
      invariantKind: "departure",
      statement: "A build carrying no base role is named for the `no-role` role.",
    },
    {
      invariantKind: "departure",
      statement: "Which companions get a progress page is read off the companion table.",
    },
    {
      invariantKind: "departure",
      statement: "Every companion the game gives a definition id gets a page for the account.",
    },
    {
      invariantKind: "departure",
      statement: "A companion the saved file never mentions still gets a progress page.",
    },
    {
      invariantKind: "departure",
      statement: "A page here is written by `upsertPage` unless the caller states another writer.",
    },
    {
      invariantKind: "departure",
      statement: "A reported line reaches `console.log` unless the caller states another reporter.",
    },
    {
      invariantKind: "departure",
      statement: "A warning reaches `console.warn` unless the caller states another reporter.",
    },
    {
      invariantKind: "constraint",
      statement: "A file holding no `Default` table is refused.",
    },
    {
      invariantKind: "constraint",
      statement: "A file holding no account-wide table is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens the saved-variables file.",
    },
    {
      invariantKind: "gap",
      statement: "The canonical hash a build reads back as reaches no page.",
    },
  ],
} as const satisfies Module
