import type { Module } from "@akasha/code/module"

export const commandMeasuring = {
  id: "01a080de-5ff9-7631-b4e9-08d25ce2bf64",
  pageTypeSlug: "module",
  type: "module",
  slug: "command-measuring",
  definition: "what the runs of every command cost, read back over a window",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rows are read from beside the page of the command that ran.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every command page is reached by walking the tree rather than by a folder named here.",
    },
    {
      invariantKind: "departure",
      statement: "A folder git or a package manager owns is walked past.",
    },
    {
      invariantKind: "departure",
      statement: "Every numbered file of a page's rows is read rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named as a rows file is no file to read.",
    },
    {
      invariantKind: "departure",
      statement: "A row a write left half appended leaves the file it is in unread.",
    },
    {
      invariantKind: "departure",
      statement: "A row naming the command phase is read, and no other row is.",
    },
    {
      invariantKind: "departure",
      statement: "The row a change run wrote beside the same page counts nowhere here.",
    },
    {
      invariantKind: "departure",
      statement: "The runs are gathered under the command that ran.",
    },
    {
      invariantKind: "departure",
      statement: "A window is chosen by the rule the check measuring chooses one by.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are drawn by the rule the check measuring draws its rows by.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a row.",
    },
  ],
} as const satisfies Module
