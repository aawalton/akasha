import type { Command } from "../command.page-type.ts"

export const complexity = {
  id: "01a0680b-94d1-745a-98c7-ad24f22fec92",
  pageTypeSlug: "command",
  slug: "complexity",
  definition: "the command saying how complex each function and file of a checkout's TypeScript is",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "cyclomatic", takes: "the act, which is the McCabe complexity of each function" },
    { said: "halstead", takes: "the act, which is each function's token counts and what follows" },
    { said: "maintainability", takes: "the act, which is the maintainability index of each file" },
    { said: "report", takes: "the act, which is every metric by percentile with its outliers" },
    { said: "--file <path>", takes: "the one file to read, said from the repository root" },
    { said: "--threshold <n>", takes: "the figure a row must reach to stand in the answer" },
    { said: "--top <n>", takes: "how many rows stand in the answer, worst first" },
    { said: "--json", takes: "the rows as one line of JSON rather than as tab-separated columns" },
  ],
  helpNotes: [
    "the act is the first word, and one call names one act.",
    "cyclomatic complexity is one over the decision points: if, case, for, while, do, catch, ternary, each `&&`, `||`, `??`, and each `?.`.",
    "else and finally are no decision point and count for nothing.",
    "halstead counts the distinct and the total operators and operands of a function, and volume, difficulty, effort, time and bugs follow from those four.",
    "type annotations and comments stand outside the halstead counts.",
    "the maintainability index is the Visual Studio variant over halstead volume, the cyclomatic sum and the source lines a file holds.",
    "blank lines and comment-only lines are no source line.",
    "the index rises as a file shortens, so splitting one function in two raises it though neither the decision points nor the vocabulary changed.",
    "`report` says p50, p75, p90, p95, p99 and the maximum, because complexity follows a power law and a mean hides the outliers the maintenance is spent on.",
    "`--threshold` keeps the rows at or over the figure, and under `maintainability` keeps the rows at or under it, since a low index is the bad one.",
    "`report` takes `--top` alone, and carries ten of each metric where none is said.",
    "an answer is figures rather than violations, so nothing here refuses a body for being complex.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The act is the first word.",
    },
    {
      invariantKind: "departure",
      statement: "One call names one act.",
    },
    {
      invariantKind: "departure",
      statement: "An act this does not carry is refused rather than answered as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A flag an act does not take is refused against that act by name.",
    },
    {
      invariantKind: "departure",
      statement: "A cyclomatic row is one function and a maintainability row is one file.",
    },
    {
      invariantKind: "departure",
      statement: "Rows stand worst first.",
    },
    {
      invariantKind: "departure",
      statement: "Worst is the highest complexity and the lowest maintainability index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A threshold is a floor for every metric but the maintainability index, where it is a ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "A file named is read against the repository root rather than the calling folder.",
    },
    {
      invariantKind: "departure",
      statement: "A file that will not open is passed over rather than refusing the rest.",
    },
    {
      invariantKind: "departure",
      statement: "A scope holding no row is answered empty rather than refused.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "The workspace read is the one the process stands in rather than the root the call names.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges a figure against a limit.",
    },
  ],
} as const satisfies Command
