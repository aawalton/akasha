import type { Module } from "@akasha/code-system/module"

export const bodyMerging = {
  id: "01a062c6-2c7a-7f20-859b-3a675a130bd0",
  pageTypeSlug: "module",
  slug: "body-merging",
  definition:
    "three bodies merged line by line as git merges them, or the conflict that refuses a change",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The body a change was built from is what a merge reads as its base.",
    },
    {
      invariantKind: "departure",
      statement: "The body a change would leave is what a merge reads as the change's own.",
    },
    {
      invariantKind: "departure",
      statement: "The body HEAD holds is what a merge reads as what moved under the change.",
    },
    {
      invariantKind: "departure",
      statement: "A body nothing moved under is landed whole rather than merged.",
    },
    {
      invariantKind: "departure",
      statement: "A body already holding what a change would leave is landed whole.",
    },
    {
      invariantKind: "departure",
      statement: "A merge is line by line.",
    },
    {
      invariantKind: "departure",
      statement: "A merge is git's own rather than spelled here.",
    },
    {
      invariantKind: "departure",
      statement: "A conflict refuses a change rather than landing a body holding conflict marks.",
    },
    {
      invariantKind: "departure",
      statement: "A line conflict answers with the body git marked as well as with why.",
    },
    {
      invariantKind: "departure",
      statement: "A conflict that is no line conflict answers with why alone.",
    },
    {
      invariantKind: "departure",
      statement: "The labels marking a conflict are spelled here rather than by a caller.",
    },
    {
      invariantKind: "departure",
      statement: "A body carrying the label for what a change would leave is carrying a conflict.",
    },
    {
      invariantKind: "departure",
      statement: "How many conflicts git found is said in the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A path taken away while a change writes that path refuses the change.",
    },
    {
      invariantKind: "departure",
      statement: "A change taking a path away is refused where that path moved under the change.",
    },
    {
      invariantKind: "departure",
      statement: "A path two changes each make is refused rather than merged.",
    },
    {
      invariantKind: "departure",
      statement: "Bytes that are not text are refused rather than merged line by line.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a repository.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes into a repository.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes the hold.",
    },
    {
      invariantKind: "absence",
      statement: "Which body a caller merges against is the caller's to say.",
    },
    {
      invariantKind: "gap",
      statement:
        "A merge starts git once for each body merged rather than merging in this process.",
    },
  ],
} as const satisfies Module
