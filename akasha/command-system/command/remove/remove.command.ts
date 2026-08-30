import type { Command } from "../command.page-type.ts"

export const remove = {
  id: "01a04bed-1461-7364-8579-6799d5aa8ea0",
  pageTypeSlug: "command",
  slug: "remove",
  definition: "named paths taken away, gated together and removed or refused as one",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  mechanical: true,
  taking: [
    { said: "--file-path <path>", takes: "a path under `akasha/` to take away" },
    { said: "--message <text>", takes: "what the commit is for" },
    { said: "--message-file <file>", takes: "a file the commit message is read from" },
    { said: "--break-the-glass <reason>", takes: "why no check runs, said in the commit" },
    { said: "--dry-run", takes: "say what would happen and write nothing" },
  ],
  helpNotes: [
    "--file-path repeats, so several paths go in one commit.",
    "a directory named takes away every file git holds under it.",
    "the files standing beside what you name go with it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A path is read against the repository root and never against the folder the call was made in.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is not there is already gone rather than refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A removal forgets the reading of every path it takes and of a named path already gone for every agent holding one.",
    },
    {
      invariantKind: "departure",
      statement: "Which named paths went and which were already gone is said.",
    },
    {
      invariantKind: "departure",
      statement: "Neither is reported as the other.",
    },
    {
      invariantKind: "departure",
      statement: "A call where no named path stood commits nothing and still answers as done.",
    },
    {
      invariantKind: "departure",
      statement: "A directory opens onto every tracked file under it.",
    },
    {
      invariantKind: "departure",
      statement: "A directory holding no tracked file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page's sidecars go with it without being named.",
    },
    {
      invariantKind: "departure",
      statement: "A directory the removal leaves empty goes with it.",
    },
    {
      invariantKind: "departure",
      statement: "Everything taken without being named is reported.",
    },
    {
      invariantKind: "departure",
      statement: "Every path a call names is refused in one answer.",
    },
    {
      invariantKind: "departure",
      statement: "`--dry-run` names everything that would go whether named or not.",
    },
    {
      invariantKind: "departure",
      statement: "A path is named behind `--file-path` like `write` and `edit` name theirs.",
    },
    {
      invariantKind: "departure",
      statement: "A path standing on its own is refused rather than read as one.",
    },
    {
      invariantKind: "gap",
      statement: "What a removal leaves behind still stands up on its own.",
    },
  ],
} as const satisfies Command
