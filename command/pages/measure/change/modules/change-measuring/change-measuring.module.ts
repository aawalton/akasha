import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const changeMeasuring = {
  id: "01a080d7-222f-742b-8fbf-b2c8b66828d6",
  type: "module",
  slug: "change-measuring",
  definition: "what the runs of a change and of an apply cost, read back over a window",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows are read from beside the page of the command that wrote them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page of every command running a change or an apply is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where each of those pages sits is read from the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every numbered file of a page's rows is read rather than the first alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A numbered file that is not there is no file left unread.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that would not read is named rather than counting as no runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row a write left half appended is passed over and the rest of the file read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file that row is in is named beneath the table under its own heading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The runs are gathered under what ran rather than under the page read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A window is chosen by the rule the check measuring chooses one by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count of runs names the most recent runs over both pages together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A period names every row stamped within that period.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows are drawn by the rule the check measuring draws its rows by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row naming the change phase or the apply phase is read and no other row is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The row a command run wrote beside the same page counts nowhere here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change's ceilings are read from the page of the change that ran.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A change stating no processor ceiling is drawn with the one every change is held to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An apply is no change page and is drawn with no ceiling.",
    },
  ],
} as const satisfies Module
