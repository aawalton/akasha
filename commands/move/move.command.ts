import type { Command } from "../../command-system/commands/command.page-type.ts"

export const move = {
  id: "01a04bed-1450-7dca-b1b5-ce3ca9f6ecaf",
  pageTypeSlug: "command",
  slug: "move",
  definition:
    "files carried to new paths, with what they name and what names them repointed in the same act",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  changeKindSlug: "change-mechanical",
  partSlugs: [
    "module/move-arguing",
    "module/move-listing",
    "module/move-manifesting",
    "module/move-naming",
    "module/move-outside",
    "module/move-parenting",
    "module/move-renaming",
    "module/move-repointing",
    "module/move-resettling",
    "module/move-spreading",
  ],
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
    "a folder you name carries every file git holds under it, each keeping its place beneath it.",
    "a file git is told to ignore goes as a sidecar rather than as folder contents.",
    "the files naming what moves are repointed in the same commit.",
    "any tracked file spelling a path that moves is repointed with it, once and only once.",
    "an agent settings document a live seat watches is rewritten once the move has landed.",
    "one that would not take the rewrite is named, and the move lands rather than refusing.",
    "one reaching in by a relative path is repointed where that path resolves to what moves.",
    "a package manifest naming a file that moves is repointed with it.",
    "a manifest that moves states its ways in from the folder it arrives in.",
    "a way in whose file leaves the package is taken out of that manifest.",
    "a package folder that moves is reached again where it arrives, before anything is judged.",
    "a value beside a renamed page named for its old slug is renamed with it.",
    "a spelling of the old slug it cannot judge to be an address is named rather than changed.",
    "a page arriving where no page holds keeps the parent it has, and the answer says so.",
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
      statement: "A page's sidecars go with that page without being named.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming a folder carries every file git holds under that folder.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file under a folder that moves keeps the place the file had beneath that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder arrives at the path a call names rather than inside that path.",
    },
    {
      invariantKind: "departure",
      statement: "A folder git holds no file under is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder holding a file git does not track is refused rather than moved without that file.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding a file git is told to ignore is moved rather than refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file git is told to ignore travels as a sidecar rather than as folder contents.",
    },
    {
      invariantKind: "departure",
      statement: "A folder a move leaves empty is cleared on disk.",
    },
    {
      invariantKind: "departure",
      statement: "A package manifest naming a file that moves is repointed with that file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A package whose manifest moves is reached again at the folder that manifest arrives in.",
    },
    {
      invariantKind: "departure",
      statement: "A package is reached again before the checks judge the move.",
    },
    {
      invariantKind: "departure",
      statement: "A link a move made is taken back where the move does not land.",
    },
    {
      invariantKind: "absence",
      statement: "A dry run makes no link.",
    },
    {
      invariantKind: "departure",
      statement:
        "A way into a package is repointed where the file that way names arrives inside that package.",
    },
    {
      invariantKind: "departure",
      statement: "A way into a package whose file leaves that package is taken out.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest that moves states its ways in from the folder that manifest arrives in.",
    },
    {
      invariantKind: "absence",
      statement: "What a package names under its dependencies is not moved with a file.",
    },
    {
      invariantKind: "departure",
      statement: "A file holding uncommitted values goes with the page that file sits beside.",
    },
    {
      invariantKind: "departure",
      statement: "The file is carried on disk under the hold that commits the move.",
    },
    {
      invariantKind: "departure",
      statement: "A body is carried as it stands but for the specifiers it holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bodies a move carries and repoints are read from the base commit rather than the working tree.",
    },
    {
      invariantKind: "departure",
      statement: "A file that is no page's own arrives under the name that file already has.",
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
      statement:
        "Which pages address a renamed page is read from the index as the index is before the change.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a rename leaves an edge naming nobody is answered by the checks rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "An answer names every place that still spells a renamed page's old slug.",
    },
    {
      invariantKind: "departure",
      statement: "A place still spelling the old slug is reported rather than refusing the move.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a body still spells the old slug is answered by the line that slug sits on.",
    },
    {
      invariantKind: "departure",
      statement: "A path still spelling the old slug is answered as the path itself.",
    },
    {
      invariantKind: "absence",
      statement: "A name a page imports a renamed page's value by is left unchanged.",
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
      statement: "A path spelled as plain text is repointed as readily as a path naming a module.",
    },
    {
      invariantKind: "departure",
      statement: "A body reaches by both spellings.",
    },
    {
      invariantKind: "absence",
      statement:
        "A string naming no path that moves is left alone unless the string names a module in a moving body.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file moving in the same act is repointed from its own body and never again as an importer.",
    },
    {
      invariantKind: "departure",
      statement: "An index that cannot answer what imports a path refuses the move.",
    },
    {
      invariantKind: "constraint",
      statement: "The index carries the pages rather than every file git tracks.",
    },
    {
      invariantKind: "departure",
      statement: "A tracked file spelling a path that moves is repointed in the same commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which files beyond the index spell a path that moves is answered by searching what git tracks.",
    },
    {
      invariantKind: "departure",
      statement: "A file beyond the index is repointed where a body spells that path itself.",
    },
    {
      invariantKind: "departure",
      statement: "A body a move carries is repointed where that body spells a path that moved.",
    },
    {
      invariantKind: "departure",
      statement: "A relative path resolving to a path that moved is repointed.",
    },
    {
      invariantKind: "absence",
      statement: "A file the index already repointed is not repointed a second time.",
    },
    {
      invariantKind: "departure",
      statement: "A relative path is resolved against the folder of the file carrying that path.",
    },
    {
      invariantKind: "departure",
      statement:
        "The files that reached in by a relative path are reported apart from those that spelled one.",
    },
    {
      invariantKind: "absence",
      statement: "A name carrying more of a segment than the path that moved is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "The files beyond the index that were repointed are reported apart from the rest.",
    },
    {
      invariantKind: "departure",
      statement: "A missing index leaves what names a file unread rather than naming nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path two pages claim leaves what names it unread rather than read from one of those pages.",
    },
    {
      invariantKind: "departure",
      statement: "Every pair a call names lands together or not at all.",
    },
    {
      invariantKind: "departure",
      statement: "`--dry-run` names every pair the move would carry.",
    },
    {
      invariantKind: "departure",
      statement: "A reading of a file a move carries is carried with that file.",
    },
    {
      invariantKind: "departure",
      statement: "A body this carries is marked carried.",
    },
    {
      invariantKind: "gap",
      statement: "A path a body builds in a template is repointed as one written whole is.",
    },
    {
      invariantKind: "gap",
      statement: "A string reading as a moved path is repointed only where it names one.",
    },
    {
      invariantKind: "gap",
      statement: "A file arrives at its new path reaching everything the file reached before.",
    },
    {
      invariantKind: "gap",
      statement: "Everything that reached a file before the move reaches that file after.",
    },
  ],
} as const satisfies Command
