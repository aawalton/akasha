import type { Module } from "@akasha/code/module"

export const changeMeasuring = {
  id: "01a080d7-222f-742b-8fbf-b2c8b66828d6",
  pageTypeSlug: "module",
  type: "module",
  slug: "change-measuring",
  definition: "what the runs of a change and of an apply cost, read back over a window",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rows are read from beside the page of the command that wrote them.",
    },
    {
      invariantKind: "departure",
      statement: "The page of every command running a change or an apply is read.",
    },
    {
      invariantKind: "departure",
      statement: "Every numbered file of a page's rows is read rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement: "A numbered file that is not there is no file left unread.",
    },
    {
      invariantKind: "departure",
      statement: "A file that would not read is named rather than counting as no runs.",
    },
    {
      invariantKind: "departure",
      statement: "A row a write left half appended leaves the file it is in unread.",
    },
    {
      invariantKind: "departure",
      statement: "The runs are gathered under what ran rather than under the page read.",
    },
    {
      invariantKind: "departure",
      statement: "A window is chosen by the rule the check measuring chooses one by.",
    },
    {
      invariantKind: "departure",
      statement: "A count of runs names the most recent runs over both pages together.",
    },
    {
      invariantKind: "departure",
      statement: "A period names every row stamped within that period.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are drawn by the rule the check measuring draws its rows by.",
    },
    {
      invariantKind: "departure",
      statement: "A row naming the change phase or the apply phase is read, and no other row is.",
    },
    {
      invariantKind: "departure",
      statement: "The row a command run wrote beside the same page counts nowhere here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a row.",
    },
  ],
} as const satisfies Module
