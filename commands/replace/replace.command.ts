import type { Command } from "../../command-system/commands/command.page-type.ts"

export const replace = {
  id: "01a06d62-a511-7c58-930f-49c6ddabe874",
  pageTypeSlug: "command",
  slug: "replace",
  definition:
    "one literal passage replaced wherever it is in the files named, landed as one commit",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "--file-path <path>", takes: "a file the passage is replaced in, said once per file" },
    { said: "--old-file <file>", takes: "a file holding the passage to replace" },
    { said: "--new-file <file>", takes: "a file holding what that passage becomes" },
    { said: "--dry-run", takes: "read what each file named holds and change nothing" },
    { said: "--message <text>", takes: "what the commit is for" },
    { said: "--message-file <file>", takes: "a file the commit message is read from" },
  ],
  helpNotes: [
    "--file-path repeats, and every file it names changes in the one commit.",
    "the passage and what it becomes are files or standard input, never text said on the command line.",
    "a call stating no --old-file reads the passage from standard input.",
    "a passage piped in sits between <<<<<<< old and =======, and what it becomes before >>>>>>> new.",
    "the passage is matched as the bytes it is rather than as a pattern.",
    "a file named that holds the passage nowhere refuses the call, so name only the files that change.",
    "--dry-run is how the files that hold the passage are found.",
    "a passage `edit` refuses for repeating in one file is what this command is for.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A passage is replaced at every occurrence in each file named.",
    },
    {
      invariantKind: "departure",
      statement: "A passage is matched as bytes rather than as a pattern.",
    },
    {
      invariantKind: "departure",
      statement: "A file named that holds the passage nowhere refuses the whole call.",
    },
    {
      invariantKind: "departure",
      statement: "The file holding it nowhere is named in that refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no `--file-path` is refused.",
    },
    {
      invariantKind: "absence",
      statement: "A file this call does not name is never reached.",
    },
    {
      invariantKind: "departure",
      statement: "`--dry-run` reports how many occurrences each file named holds.",
    },
    {
      invariantKind: "departure",
      statement: "`--dry-run` reports what the files named hold together.",
    },
    {
      invariantKind: "departure",
      statement: "`--dry-run` changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "`--dry-run` refuses no file for holding the passage nowhere.",
    },
    {
      invariantKind: "departure",
      statement:
        "A passage reaches this command at `--old-file` or standard input rather than the command line.",
    },
    {
      invariantKind: "departure",
      statement: "A passage carries the trailing newline of the file naming it.",
    },
    {
      invariantKind: "departure",
      statement: "An empty passage names no place and is refused.",
    },
    {
      invariantKind: "departure",
      statement: "One call replaces one passage.",
    },
    {
      invariantKind: "departure",
      statement: "A file changed between this call's read and its write refuses the whole call.",
    },
    {
      invariantKind: "departure",
      statement: "Once the bodies are worked out this lands exactly as `edit` lands.",
    },
    {
      invariantKind: "departure",
      statement: "A path inside `.git` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder at the top of the repository is refused.",
    },
    {
      invariantKind: "departure",
      statement: "One path named more than once by a call is refused.",
    },
    {
      invariantKind: "gap",
      statement: "A caller learns which files hold a passage before changing any of them.",
    },
  ],
} as const satisfies Command
