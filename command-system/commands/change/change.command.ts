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
    { said: "remove-page", takes: "the change to run, which takes one page away" },
    { said: "--file-path <path>", takes: "the path the change named acts on" },
  ],
  helpNotes: [
    "the change is the first word, and the flags after it are the ones that change takes.",
    "a change answers edits rather than writing them, and the edits are appended beside this agent's page.",
    "nothing lands here, and `akasha apply` compiles the edits into the patch and lands them.",
    "two runs leave two sets of edits in the order the runs were made.",
    "a change reads the world as every edit appended before it had already landed.",
    "a change that refuses appends nothing and leaves the edits as the edits were.",
    "making the edits and applying them are two calls, so the edits held unapplied are the dry run.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The change to run is named by the first word.",
    },
    {
      invariantKind: "departure",
      statement: "A word naming no change is refused with the changes this command runs.",
    },
    {
      invariantKind: "departure",
      statement: "The flags a call takes are the flags the change named takes.",
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
      invariantKind: "absence",
      statement: "Nothing here lands.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a body onto the tree.",
    },
    {
      invariantKind: "absence",
      statement: "This command takes no dry run.",
    },
    {
      invariantKind: "gap",
      statement: "The changes this runs are spelled here rather than read off the index.",
    },
    {
      invariantKind: "gap",
      statement: "A change is judged by no check until the edits that change answered apply.",
    },
  ],
} as const satisfies Command
