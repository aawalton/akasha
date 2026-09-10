import type { Command } from "../../command.page-type.types.ts"

export const index = {
  id: "01a04de1-13fa-7331-979e-d443758eefad",
  pageTypeSlug: "command",
  type: "command",
  slug: "index",
  definition: "the index repaired against the pages of the repository as it is",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "refresh",
      takes: "build the index over the repository as it stands and put it in place",
    },
    { said: "--dry-run", takes: "say what the repair would change and write nothing" },
  ],
  helpNotes: [
    "refresh is the act it carries, and one call names one act.",
    "a refresh makes no commit, so it takes no message and runs no check.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "`refresh` is the only act there is.",
    },
    {
      invariantKind: "departure",
      statement: "The index is built over the repository as the repository stands.",
    },
    {
      invariantKind: "departure",
      statement: "The commit the report names is read from HEAD as the repair opens.",
    },
    {
      invariantKind: "departure",
      statement: "The index is repaired in place.",
    },
    {
      invariantKind: "departure",
      statement: "The index is repaired file by file.",
    },
    {
      invariantKind: "departure",
      statement: "The landing lock is held from reading HEAD to the last file written.",
    },
    {
      invariantKind: "departure",
      statement: "A flag belonging to a command that writes is refused rather than ignored.",
    },
    {
      invariantKind: "departure",
      statement: "`--dry-run` says the change the repair would make and writes no file.",
    },
    {
      invariantKind: "departure",
      statement: "An entry that would not file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path under the index belonging to no index is taken away before the repair.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run takes no path away.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run names the paths that would be taken away.",
    },
    {
      invariantKind: "departure",
      statement: "The report counts the paths taken away.",
    },
    {
      invariantKind: "departure",
      statement: "The report names the files the index differed in as well as counting the files.",
    },
    {
      invariantKind: "departure",
      statement: "The report counts the files under each index the difference falls in.",
    },
    {
      invariantKind: "absence",
      statement: "A refresh writes nothing tracked and makes no commit.",
    },
    {
      invariantKind: "gap",
      statement: "A body a hand is still writing is taken as the body stands.",
    },
  ],
} as const satisfies Command
