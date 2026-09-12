import type { Command } from "akasha/commands/command.page-type.types.ts"

export const gitRestore = {
  id: "01a07267-f795-738d-90c6-a5e16e277228",
  type: "command",
  slug: "git-restore",
  definition:
    "the command putting named paths back to what HEAD says, in the working tree and the git index",
  code: "ts",
  test: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path is named behind `--file-path` as `write` and `remove` name a path.",
    },
    {
      invariantKind: "departure",
      statement: "A path with no flag before the path is refused rather than read as a named path.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing but `--file-path` names a path.",
    },
    {
      invariantKind: "absence",
      statement: "No folder is taken.",
    },
    {
      invariantKind: "absence",
      statement: "No whole tree is taken.",
    },
    {
      invariantKind: "absence",
      statement: "No flag meaning a folder or a whole tree is taken.",
    },
    {
      invariantKind: "departure",
      statement: "A path HEAD has no file at and the git index has no entry for is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path HEAD has no file at and the working tree holds a file at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path only the git index holds, as a file, has that git index entry cleared.",
    },
    {
      invariantKind: "departure",
      statement: "A path only the git index holds as anything but a file is refused.",
    },
    {
      invariantKind: "absence",
      statement: "A file this command is named is never deleted from the working tree.",
    },
    {
      invariantKind: "departure",
      statement: "A path HEAD holds as anything but a file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "One path refused refuses the whole call.",
    },
    {
      invariantKind: "departure",
      statement: "The body written is the body HEAD has byte for byte.",
    },
    {
      invariantKind: "departure",
      statement: "The git index is written to the mode and the object HEAD holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path whose working tree and git index both have HEAD's body is left alone and said so.",
    },
    {
      invariantKind: "departure",
      statement: "A path whose git index alone has another body is put back too.",
    },
    {
      invariantKind: "departure",
      statement: "A git index entry cleared is said as its own case rather than as a restore.",
    },
    {
      invariantKind: "absence",
      statement: "No working tree file is written where a git index entry alone is cleared.",
    },
    {
      invariantKind: "departure",
      statement: "The body each path discards is said before the body each path was put back to.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is committed.",
    },
    {
      invariantKind: "absence",
      statement: "No check runs.",
    },
    {
      invariantKind: "absence",
      statement: "No warrant is owed.",
    },
    {
      invariantKind: "absence",
      statement: "No reading is forgotten.",
    },
    {
      invariantKind: "gap",
      statement: "Uncommitted drift goes without a git call that could take another agent's work.",
    },
    {
      invariantKind: "departure",
      statement: "A restore git broke or stopped part way is refused as the machine's fault.",
    },
    {
      invariantKind: "departure",
      statement: "`--file-path` is named again for each path put back.",
    },
  ],
  name: "restore",
  arguments: [{ argument: "argument/file-path", required: true }],
} as const satisfies Command
