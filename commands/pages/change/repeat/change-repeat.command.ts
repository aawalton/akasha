import type { Command } from "akasha/commands/command.page-type.types.ts"

export const changeRepeat = {
  id: "01a091e2-0bc2-799b-9f8f-d9a05bfc3696",
  type: "command",
  slug: "change-repeat",
  definition: "the command applying one change batch after batch until a batch lands nothing",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  timeout: null,
  helpNotes: [
    "the change to repeat is the first word, and the arguments that change takes are piped in.",
    "`at-most` says how many pages one batch acts on, and a repeat naming none is refused.",
    "a change whose page states no `takes-at-most` is refused, because one run of it acts on every page.",
    "each batch is a run of `akasha change apply` in a child of its own, so no batch holds what the batch before it held.",
    "a batch is judged by the checks as any apply is, and a batch the checks refuse ends the run.",
    "the edits a refused batch leaves kept are dropped, so a later run begins over a clean tree.",
    "a call made where edits are kept already is refused, because a repeat lands what is kept as its own.",
    "what each batch cost is appended beside the apply command's page as any apply's is.",
    "the report names the commit each batch landed, and closes with what ended the run.",
    "a repeat that landed no batch at all is refused with what the first batch said.",
    "a repeat runs under no ceiling on the wall clock.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The change to repeat is named by the first word of the call.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no change is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A change whose page states no `takes-at-most` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call handed no `at-most` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling that is no whole number above nothing is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a change takes a ceiling is read off that change's page.",
    },
    {
      invariantKind: "departure",
      statement: "Every batch is handed the arguments the call was piped, unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A batch runs in a child of its own rather than in this process.",
    },
    {
      invariantKind: "departure",
      statement: "The file a child runs is read from the index rather than spelled here.",
    },
    {
      invariantKind: "departure",
      statement: "A batch that landed a commit is followed by another batch.",
    },
    {
      invariantKind: "departure",
      statement: "A batch landing no commit ends the run.",
    },
    {
      invariantKind: "departure",
      statement: "The edits a batch landing no commit left kept are dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A drop that refused is said with what ended the run.",
    },
    {
      invariantKind: "departure",
      statement: "A call made where edits are kept already is refused before any batch runs.",
    },
    {
      invariantKind: "departure",
      statement: "What that batch said is the last thing the report says.",
    },
    {
      invariantKind: "departure",
      statement: "A run whose first batch landed nothing is refused rather than answered as done.",
    },
    {
      invariantKind: "departure",
      statement: "The report names the commit each batch landed.",
    },
    {
      invariantKind: "absence",
      statement: "No line a batch printed of what it wrote is carried into the report.",
    },
    {
      invariantKind: "absence",
      statement: "This command edits nothing itself.",
    },
    {
      invariantKind: "absence",
      statement: "No ceiling is held on how many batches one run takes.",
    },
  ],
  name: "repeat",
} as const satisfies Command
