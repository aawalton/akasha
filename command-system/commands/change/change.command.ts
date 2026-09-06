import type { Command } from "../command.page-type.ts"

export const change = {
  id: "01a07780-1fd8-71ad-8268-5d477e7f5cbc",
  pageTypeSlug: "command",
  slug: "change",
  definition: "one mechanical change run for the edits it answers rather than for a landing",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "add-file", takes: "the change to run, which writes one body at one path" },
    { said: "change-file", takes: "the change to run, which replaces one passage of one body" },
    { said: "remove-page", takes: "the change to run, which takes one page away" },
    { said: "remove-page-type", takes: "the change to run, which takes one page type away" },
    { said: "drop", takes: "the act taking away every edit kept beside this agent's page" },
  ],
  helpNotes: [
    "the change is the first word, and the arguments that change takes are piped in.",
    "an argument is a line `key: value`, or `key <fence>` opening a body that `<fence>` alone closes.",
    "`key <fence> no-newline` opens a body whose last line keeps no newline, for a passage ending mid-line.",
    "the fence is yours to pick, so a body carrying one run of characters is opened with another.",
    "nothing on the command line carries a value, so no shell reads a quote or a backslash.",
    "`at` names a path, read against the repository root.",
    "a change answers edits rather than writing them, and the edits are appended beside this agent's page.",
    "`apply` asks for an apply once this change answers, and what follows it is the commit message.",
    "an apply asked for lands every edit kept rather than the edits this run appended alone.",
    "a change asking for no apply lands nothing, and `akasha apply` lands the edits kept.",
    "two runs leave two sets of edits in the order the runs were made.",
    "a change reads the world as every edit appended before it had already landed.",
    "a change that refuses appends nothing and leaves the edits as the edits were.",
    "a change that refuses applies nothing, so an apply asked for is left unmade.",
    "a change asking for no apply holds its edits unapplied, and that is the dry run.",
    "`drop` is the one first word naming no change, and takes away every edit kept.",
    "a drop names each edit that went, because nothing puts a dropped edit back.",
    "no check runs over the change, and an apply judges the edits kept before folding the edits in.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The change to run is named by the first word.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change is reached by its address rather than by a name this command's code holds.",
    },
    {
      invariantKind: "departure",
      statement: "A word reaching no change is refused by the address that reached nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The change is loaded before the turn over the edits is taken.",
    },
    {
      invariantKind: "absence",
      statement: "No flag is said on the command line.",
    },
    {
      invariantKind: "departure",
      statement: "The arguments a change takes are read from standard input.",
    },
    {
      invariantKind: "departure",
      statement: "A body opened with `no-newline` names a passage ending mid-line.",
    },
    {
      invariantKind: "departure",
      statement: "A call piping nothing in is refused rather than run with no argument.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value carrying a quote or a newline reaches the change as the caller wrote that value.",
    },
    {
      invariantKind: "departure",
      statement: "The key `at` names a path.",
    },
    {
      invariantKind: "departure",
      statement: "A path is read against the repository root here rather than by the change.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside the repository is refused before the change is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "The key `apply` asks for an apply once the change has answered.",
    },
    {
      invariantKind: "departure",
      statement: "The value at `apply` is the commit message.",
    },
    {
      invariantKind: "departure",
      statement: "An apply is asked for among the arguments rather than on the command line.",
    },
    {
      invariantKind: "departure",
      statement: "The key `apply` is read here rather than handed to the change.",
    },
    {
      invariantKind: "departure",
      statement: "An apply asked for with no message is refused before the change is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A change that refuses applies nothing though an apply was asked for.",
    },
    {
      invariantKind: "departure",
      statement: "An apply asked for is the apply `akasha apply` makes.",
    },
    {
      invariantKind: "departure",
      statement:
        "An apply asked for lands every edit kept rather than the edits that run appended.",
    },
    {
      invariantKind: "departure",
      statement: "A call asking for an apply says nothing of the edits being kept for an apply.",
    },
    {
      invariantKind: "departure",
      statement: "The edits a change answers are appended beside the calling agent's page.",
    },
    {
      invariantKind: "departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Two runs leave two sets of edits in the order the runs were made.",
    },
    {
      invariantKind: "departure",
      statement: "A change is handed the world the edits appended before that change leave.",
    },
    {
      invariantKind: "departure",
      statement: "The edits appended before are folded into one answer to work that world out.",
    },
    {
      invariantKind: "departure",
      statement: "A fold that refuses refuses the run rather than being read as an empty world.",
    },
    {
      invariantKind: "departure",
      statement: "A change that refuses appends nothing and says why the change refused.",
    },
    {
      invariantKind: "departure",
      statement: "A world whose shadow will not build refuses the run.",
    },
    {
      invariantKind: "departure",
      statement: "The edits are read and appended to under one turn over the file the edits fill.",
    },
    {
      invariantKind: "departure",
      statement: "`drop` names no change and takes away every edit kept.",
    },
    {
      invariantKind: "departure",
      statement: "A drop names each edit that went.",
    },
    {
      invariantKind: "departure",
      statement: "A drop over no edit kept says so rather than refusing.",
    },
    {
      invariantKind: "absence",
      statement: "No drop takes one path out and leaves the rest.",
    },
    {
      invariantKind: "departure",
      statement: "No check runs over the change itself.",
    },
    {
      invariantKind: "departure",
      statement: "An apply judges the whole set of edits kept before folding the edits in.",
    },
    {
      invariantKind: "departure",
      statement: "An apply is where a check refusing stops the edits landing.",
    },
    {
      invariantKind: "departure",
      statement: "A check refusing at an apply leaves the edits kept where the edits are.",
    },
    {
      invariantKind: "departure",
      statement: "A call asking for no apply lands nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A call asking for no apply writes no body onto the tree.",
    },
    {
      invariantKind: "absence",
      statement: "This command takes no dry run.",
    },
    {
      invariantKind: "gap",
      statement: "The changes this runs are named here as well as read off the index.",
    },
  ],
} as const satisfies Command
