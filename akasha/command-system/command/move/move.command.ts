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
  partSlugs: ["module/move-renaming", "module/move-repointing"],
  taking: [
    { said: "--from <path>", takes: "the path a body stands at now" },
    { said: "--to <path>", takes: "the path it arrives at" },
    { said: "--message <text>", takes: "what the commit is for" },
    { said: "--message-file <file>", takes: "a file the commit message is read from" },
    { said: "--break-the-glass <reason>", takes: "why no check runs, said in the commit" },
    { said: "--dry-run", takes: "say what would happen and write nothing" },
  ],
  helpNotes: [
    "--from and --to repeat in pairs, so several bodies move in one commit.",
    "a page's own file arriving called something else renames the slug the page states.",
    "what addresses a renamed page by its slug is repointed in the same commit.",
    "the files standing beside what you name go with it.",
    "the files naming what moves are repointed in the same commit.",
    "a path is read against the repository root, wherever the call was made.",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "A move repoints a relative specifier only.",
    },
    {
      invariantKind: "absence",
      statement: "One naming a package is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A page's sidecars go with it without being named.",
    },
    {
      invariantKind: "departure",
      statement: "A file holding uncommitted values goes with the page it stands beside.",
    },
    {
      invariantKind: "departure",
      statement: "The file is carried on disk under the hold that commits the move.",
    },
    {
      invariantKind: "departure",
      statement: "A move that refuses or throws leaves the file where it stood.",
    },
    {
      invariantKind: "departure",
      statement: "A body is carried as it stands but for the specifiers it holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bodies a move carries and repoints are read from the commit it stood on rather than from the working tree.",
    },
    {
      invariantKind: "departure",
      statement: "A file that is no page's own arrives under the name it already has.",
    },
    {
      invariantKind: "departure",
      statement: "A page's own file arriving called something else renames that page's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A rename keeps the tail the file already carries.",
    },
    {
      invariantKind: "departure",
      statement: "A page type's slug is not renamed by a move.",
    },
    {
      invariantKind: "departure",
      statement: "A renamed page states the new slug in its own body.",
    },
    {
      invariantKind: "departure",
      statement: "A renamed page's value is bound to the name that slug makes.",
    },
    {
      invariantKind: "departure",
      statement: "A file standing beside a renamed page arrives under the new slug.",
    },
    {
      invariantKind: "departure",
      statement: "Every page addressing a renamed page is repointed in the same commit.",
    },
    {
      invariantKind: "departure",
      statement: "Which pages address it is read from the index as it stands before the change.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a rename leaves an edge naming nobody is answered by the checks rather than here.",
    },
    {
      invariantKind: "absence",
      statement: "A name a page imports a renamed page's value by is left as it stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path is read against the repository root and never against the folder the call was made in.",
    },
    {
      invariantKind: "departure",
      statement:
        "What names a moved file is repointed from the index of the files importing a path.",
    },
    {
      invariantKind: "departure",
      statement: "A path spelled as plain text is repointed as readily as one naming a module.",
    },
    {
      invariantKind: "departure",
      statement: "A body reaches by both.",
    },
    {
      invariantKind: "absence",
      statement:
        "A string standing for no path that moves is left as it is unless it names a module and the body holding it moves.",
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
      statement: "The index carries the `akasha/` folder alone.",
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
      invariantKind: "departure",
      statement: "A reading of what a move carries is carried with it.",
    },
    {
      invariantKind: "departure",
      statement: "A body this carries is marked carried.",
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
