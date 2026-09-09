import type { Command } from "../../../command.page-type.ts"

export const changeDraft = {
  id: "01a08179-3176-7aa0-8d0b-d07d8da49eb2",
  pageTypeSlug: "command",
  slug: "change-draft",
  definition: "the command answering one change and keeping its edits rather than landing them",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  helpNotes: [
    "the change to answer is the first word, and the arguments that change takes are piped in.",
    "a call naming no change is refused with every change a draft runs.",
    "an argument is a line `key: value`, or `key <fence>` opening a body that `<fence>` alone closes.",
    "`key <fence> no-newline` opens a body whose last line keeps no newline, for a passage ending mid-line.",
    "the fence is yours to pick, so a body carrying one run of characters is opened with another.",
    "nothing on the command line carries a value, so no shell reads a quote or a backslash.",
    "`at` names a path, read against the repository root.",
    "a draft keeps the edits beside this agent's page and lands nothing.",
    "`akasha change apply` lands every edit kept, so many drafts land as one commit.",
    "`message` is refused here, because a draft makes no commit for a message to say.",
    "`draft` is refused here, because the word `draft` already says it.",
    "`measure` is refused here, because a draft lands nothing for the checks to measure.",
    "two drafts leave two sets of edits in the order the runs were made.",
    "a draft reads the world as every edit kept before it had already landed.",
    "a draft that refuses keeps nothing and leaves the edits as the edits were.",
    "no check runs over a draft, and the checks run where the edits land.",
    "a draft is refused where its writer has not read what the draft writes.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The change to answer is named by the first word.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no change is refused rather than reaching every change.",
    },
    {
      invariantKind: "departure",
      statement: "The arguments the change takes are read from standard input.",
    },
    {
      invariantKind: "departure",
      statement: "The edits answered are kept beside the calling agent's page.",
    },
    {
      invariantKind: "departure",
      statement: "A draft lands nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A draft names where the edits are kept and the call that lands them.",
    },
    {
      invariantKind: "departure",
      statement: "The key `message` is refused rather than carried into a commit that is not made.",
    },
    {
      invariantKind: "departure",
      statement: "The key `draft` is refused, as the word naming this command says it.",
    },
    {
      invariantKind: "departure",
      statement: "The key `measure` is refused, as a draft lands nothing to measure.",
    },
    {
      invariantKind: "departure",
      statement: "A word naming an act over the edits kept is read here as a change to answer.",
    },
    {
      invariantKind: "departure",
      statement: "A draft is handed the world the edits kept before that draft leave.",
    },
    {
      invariantKind: "departure",
      statement: "A draft that refuses keeps nothing and says why the draft refused.",
    },
    {
      invariantKind: "departure",
      statement: "A draft whose writer owes reading is refused before that draft's edits are kept.",
    },
    {
      invariantKind: "departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "absence",
      statement: "No check runs over a draft.",
    },
    {
      invariantKind: "absence",
      statement: "No flag is said on the command line.",
    },
    {
      invariantKind: "absence",
      statement: "No taking is stated here.",
    },
  ],
} as const satisfies Command
