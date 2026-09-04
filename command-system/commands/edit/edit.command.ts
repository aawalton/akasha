import type { Command } from "../command.page-type.ts"

export const edit = {
  id: "01a04beb-8a88-7a89-bcb5-4e546b75afbd",
  pageTypeSlug: "command",
  slug: "edit",
  definition:
    "stated substitutions and removals worked into one change, landed or refused together",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  changeKindSlug: "change-authored",
  taking: [
    { said: "--file-path <path>", takes: "the file to change, anywhere in the repository" },
    { said: "--old-file <file>", takes: "a file holding the passage to replace" },
    { said: "--new-file <file>", takes: "a file holding what that passage becomes" },
    { said: "--remove <path>", takes: "a path in the repository to take away" },
    { said: "--message <text>", takes: "what the commit is for" },
    { said: "--message-file <file>", takes: "a file the commit message is read from" },
    { said: "--break-the-glass <reason>", takes: "why no check runs, said in the commit" },
    { said: "--draft", takes: "keep what would land in this agent's patch rather than landing it" },
  ],
  helpNotes: [
    "--file-path, --old-file and --new-file repeat in triples, so several files change as one.",
    "a passage stated must stand exactly once in the file, or the call is refused.",
    "the passage and what it becomes are files or standard input, never text said on the command line.",
    "a --file-path stating no --old-file reads its passages from standard input.",
    "a passage piped in sits between <<<<<<< old and =======, and what it becomes before >>>>>>> new.",
    "the marker blocks repeat, and each is worked in the order stated.",
    "the files standing beside a path given to --remove go with it.",
    "a file has to be what this call read it as, wherever in the repository that file is.",
    "--draft keeps the change in the patch beside this agent's page rather than landing it.",
    "a draft is warranted as a landing is, and says what the checks refused without refusing.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A substitution matching no times or more than once is refused before any check runs.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not text is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is not there is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body standing that will not open is refused as itself rather than as absent.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file that changes under a call between its read and its write refuses the whole call.",
    },
    {
      invariantKind: "departure",
      statement: "Substitutions against one file are worked in the order stated.",
    },
    {
      invariantKind: "departure",
      statement: "Each substitution is worked against what the earlier substitutions left.",
    },
    {
      invariantKind: "departure",
      statement: "A change is stated as exact passages rather than as a diff.",
    },
    {
      invariantKind: "departure",
      statement:
        "A passage reaches this command at `--old-file` or standard input rather than the command line.",
    },
    {
      invariantKind: "departure",
      statement:
        "A passage is the bytes of the file or block naming that passage with its trailing newline included.",
    },
    {
      invariantKind: "departure",
      statement:
        "Once the bodies are worked out the edit lands exactly as `write` on the same gate and the same hold.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file this call would change is warranted as `write` warrants a file on the same record and glass.",
    },
    {
      invariantKind: "departure",
      statement: "A removal lands in the same commit as the substitutions.",
    },
    {
      invariantKind: "departure",
      statement: "A path anywhere in the repository is changed.",
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
      statement: "A path no check judged is named in the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A substitution naming no passage is refused wherever the path is.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming `--draft` keeps a patch rather than writing a body onto the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A passage a draft works against is the body on disk rather than the patch.",
    },
    {
      invariantKind: "gap",
      statement: "A caller states what a passage is and learns whether it was still that.",
    },
  ],
} as const satisfies Command
