import type { Command } from "akasha/command/command.page-type.types.ts"

export const changeRepeat = {
  id: "01a091e2-0bc2-799b-9f8f-d9a05bfc3696",
  type: "command",
  slug: "change-repeat",
  definition: "the command applying one change batch after batch until a batch lands nothing",
  code: "ts",
  test: "ts",
  maxWallSeconds: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The change to repeat is named by the first word of the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`at-most` says how many pages one batch acts on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A batch is a run of `akasha change apply` and is judged by the checks as any apply is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming neither a change nor the help flag is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The help flag is answered with what a repeat does and what a repeat takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The help flag is read before the arguments are, so nothing need be piped in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change whose page states no `takes-at-most` is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call handed no `at-most` is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ceiling that is no whole number above nothing is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a change takes a ceiling is read off that change's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every batch is handed the arguments the call was piped, unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A batch runs in a child of its own rather than in this process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file a child runs is read from the index rather than spelled here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A batch that landed a commit is followed by another batch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A batch landing no commit ends the run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The edits a batch landing no commit left kept are dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A drop that refused is said with what ended the run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A call made where edits are kept already lands those edits before its first batch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Edits that will not land refuse the call rather than being dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal says why the landing refused rather than that edits are kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row that reads as no edit is swept rather than refusing the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What the opening landing did is reported and counted as no batch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What that batch said is the last thing the report says.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run whose first batch landed nothing is refused rather than answered as done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The report names the commit each batch landed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each batch is named as soon as that batch has committed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that threw part way names those batches in its refusal.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No line a batch printed of what it wrote is carried into the report.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "This command edits nothing itself.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No ceiling is held on how many batches one run takes.",
    },
  ],
  name: "repeat",
  arguments: [{ argument: "argument/change", required: true, saidAs: "word" }],
} as const satisfies Command
