import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inboxReading = {
  id: "01a069bf-3919-77bc-a8a7-66b02d4185bf",
  type: "page-type/module",
  slug: "inbox-reading",
  definition:
    "the counts on Alan's three inboxes, taken from his day pages and kept on their readouts",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is taken on the workstation with the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each count is kept beside the readout that count was taken for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tracking day is reached through the one module saying where a day is kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The question to ask and how to read the answer are on each readout's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Three inbox counts are taken in two reads.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The task count and the temper task count are two keys on one tracking day row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tracking day is asked for once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The mail count is on a `day` page as the task counts are.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The mail count is read from the day the inbox tracking poll writes that count under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Asking the ESO day would read the wrong day on a day the two days differ.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The mail count is asked for with `asking` rather than with `valuesOfType`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`asking` refuses a page type the index does not hold.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`asking` refuses a key the page type does not declare.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`valuesOfType` answers a page type the index does not have with no rows.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "The temper task key is spelled here rather than imported from `temper-progress`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The temper task count is read with the same reader the temper module uses.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A source that cannot be read stops that source's readings and no other source's readings.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every readout this run kept no number for is named on stderr.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout nothing was kept for is left on the number taken before that run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that could not read a source has not succeeded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that kept no count at all exits 2.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that kept some counts and missed others exits 1.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run of this file takes three readings.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The root read is the root the environment states or the root the call was made in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty value in the environment states no root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where each readout's page sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout the index names no page for stops the run rather than one reading.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The counts themselves are never printed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Importing this file takes no reading.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
