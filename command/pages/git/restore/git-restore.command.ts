import type { Command } from "akasha/command/command.page-type.types.ts"

export const gitRestore = {
  id: "01a07267-f795-738d-90c6-a5e16e277228",
  type: "command",
  slug: "git-restore",
  definition:
    "the command putting named paths back to what HEAD says, in the working tree and the git index",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path is named behind `--file-path` as `write` and `remove` name a path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path with no flag before the path is refused rather than read as a named path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing but `--file-path` names a path.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No folder is taken.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No whole tree is taken.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No flag meaning a folder or a whole tree is taken.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path HEAD has no file at and the git index has no entry for is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path HEAD has no file at and the working tree holds a file at is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path only the git index holds, as a file, has that git index entry cleared.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path only the git index holds as anything but a file is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A file this command is named is never deleted from the working tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path HEAD holds as anything but a file is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One path refused refuses the whole call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body written is the body HEAD has byte for byte.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The git index is written to the mode and the object HEAD holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A path whose working tree and git index both have HEAD's body is left alone and said so.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path whose git index alone has another body is put back too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A git index entry cleared is said as its own case rather than as a restore.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No working tree file is written where a git index entry alone is cleared.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body each path discards is said before the body each path was put back to.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing is committed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No check runs.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No warrant is owed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No reading is forgotten.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Uncommitted drift goes without a git call that could take another agent's work.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A restore git broke or stopped part way is refused as the machine's fault.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal names each path put back before it stopped, not the report alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path HEAD names and holds no body for is refused as the data's fault.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other refusal here is the caller's fault.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call refused more than once is answered by the worst of those faults.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`--file-path` is named again for each path put back.",
    },
  ],
  name: "restore",
  arguments: [{ argument: "argument/file-path", required: true, repeats: true }],
} as const satisfies Command
