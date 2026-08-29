import type { Command } from "../command.page-type.ts"

export const move = {
  id: "01a04bed-1450-7dca-b1b5-ce3ca9f6ecaf",
  pageTypeSlug: "command",
  slug: "move",
  definition:
    "files carried to new paths, with what they name and what names them repointed in the same act",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  mechanical: true,
  partSlugs: ["module/move-repointing"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "A move repoints a relative specifier only; one naming a package is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A page's sidecars go with it without being named.",
    },
    {
      invariantKind: "departure",
      statement: "A body is carried as it stands but for the specifiers it holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bodies a move carries and repoints are read from the commit it stood on, never from the working tree.",
    },
    {
      invariantKind: "departure",
      statement: "A move changes where a file stands, never what it is called.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path is read against the repository root and never against the folder the call was made in, so what is typed means the same wherever it is typed.",
    },
    {
      invariantKind: "departure",
      statement:
        "What names a moved file is repointed from the index of the files importing a path.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path spelled as plain text is repointed as readily as one naming a module, because a body reaches by both.",
    },
    {
      invariantKind: "absence",
      statement:
        "A string standing for no path that moves is left as it is, unless it names a module and the body holding it moves.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file moving in the same act is repointed from its own body and never again as an importer.",
    },
    {
      invariantKind: "departure",
      statement:
        "An index that cannot answer what imports a path leaves those files as they stand and says so.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The index carries the `akasha/` folder alone, so an importer outside it is neither found nor repointed.",
    },
    {
      invariantKind: "departure",
      statement: "A missing index leaves what names a file unread rather than naming nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A path two pages claim leaves what names it unread rather than read from either.",
    },
    {
      invariantKind: "departure",
      statement: "Every pair a call names lands together or not at all.",
    },
    {
      invariantKind: "departure",
      statement: "`--dry-run` names every pair it would carry.",
    },
    {
      invariantKind: "gap",
      statement: "A file arrives at its new path reaching everything it reached before.",
    },
    {
      invariantKind: "gap",
      statement: "Everything that reached a file before the move reaches it after.",
    },
  ],
} as const satisfies Command
