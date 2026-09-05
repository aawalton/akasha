import type { Command } from "../command.page-type.ts"

export const restore = {
  id: "01a07267-f795-738d-90c6-a5e16e277228",
  pageTypeSlug: "command",
  slug: "restore",
  definition: "named paths put back as HEAD holds them, in the working tree and in the git index",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--file-path <path>", takes: "a path HEAD holds, to put back as HEAD holds it" },
  ],
  helpNotes: [
    "--file-path repeats, so several paths go back in one call.",
    "nothing else names a path: there is no --all, no folder, and no whole-tree sweep.",
    "the worktree is shared with other agents, so a restore is narrow by construction.",
    "a path HEAD does not hold is refused rather than deleted.",
    "a path already holding HEAD's body is said so and left alone.",
    "the answer says what uncommitted work went before it says what was put back.",
    "one path refused refuses the whole call, and nothing is written.",
    "nothing is committed and no check runs: HEAD's body passed the checks when HEAD's body landed.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A path is read against the repository root and never against the folder the call was made in.",
    },
    {
      invariantKind: "departure",
      statement: "A path is named behind `--file-path` like `write` and `remove` name theirs.",
    },
    {
      invariantKind: "departure",
      statement: "A path carrying no flag before it is refused rather than read as a named path.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing but `--file-path` names a path.",
    },
    {
      invariantKind: "absence",
      statement: "No folder, no whole tree and no flag meaning either is taken.",
    },
    {
      invariantKind: "departure",
      statement: "A path HEAD holds no file at is refused.",
    },
    {
      invariantKind: "absence",
      statement: "A path this command is named is never deleted.",
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
      statement: "A call carrying a refusal writes nothing at all.",
    },
    {
      invariantKind: "departure",
      statement: "The body written is the body HEAD holds, byte for byte.",
    },
    {
      invariantKind: "departure",
      statement: "The git index is written to the mode and the object HEAD holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path whose working tree and git index both hold HEAD's body is left alone and said so.",
    },
    {
      invariantKind: "departure",
      statement: "A path whose git index alone holds another body is put back too.",
    },
    {
      invariantKind: "departure",
      statement: "What each path discards is said before what each path was put back to.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is committed.",
    },
    {
      invariantKind: "absence",
      statement: "No check runs, because the body put back is the body the checks passed.",
    },
    {
      invariantKind: "absence",
      statement: "No warrant is owed, because no body the caller composed is written.",
    },
    {
      invariantKind: "absence",
      statement:
        "No reading is forgotten, since a reading is judged against the body that is there.",
    },
    {
      invariantKind: "gap",
      statement: "Uncommitted drift goes without a git call that could take another agent's work.",
    },
  ],
} as const satisfies Command
