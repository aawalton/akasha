import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const inboxReading = {
  id: "01a069bf-3919-77bc-a8a7-66b02d4185bf",
  pageTypeSlug: "module",
  type: "module",
  slug: "inbox-reading",
  definition:
    "the counts on Alan's three inboxes, taken from his day pages and kept on their readouts",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is taken on the workstation with the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "Each count is kept beside the readout that count was taken for.",
    },
    {
      invariantKind: "departure",
      statement: "The tracking day is reached through the one module saying where a day is kept.",
    },
    {
      invariantKind: "departure",
      statement: "The question to ask and how to read the answer are on each readout's own page.",
    },
    {
      invariantKind: "departure",
      statement: "Three inbox counts are taken in two reads.",
    },
    {
      invariantKind: "departure",
      statement: "The task count and the temper task count are two keys on one tracking day row.",
    },
    {
      invariantKind: "departure",
      statement: "The tracking day is asked for once.",
    },
    {
      invariantKind: "departure",
      statement: "The mail count is on a `day` page as the task counts are.",
    },
    {
      invariantKind: "departure",
      statement:
        "The mail count is read from the day the inbox tracking poll writes that count under.",
    },
    {
      invariantKind: "departure",
      statement: "Asking the ESO day would read the wrong day on a day the two days differ.",
    },
    {
      invariantKind: "departure",
      statement: "The mail count is asked for with `asking` rather than with `valuesOfType`.",
    },
    {
      invariantKind: "departure",
      statement: "`asking` refuses a page type the index does not hold.",
    },
    {
      invariantKind: "departure",
      statement: "`asking` refuses a key the page type does not declare.",
    },
    {
      invariantKind: "departure",
      statement: "`valuesOfType` answers a page type the index does not have with no rows.",
    },
    {
      invariantKind: "stopgap",
      statement: "The temper task key is spelled here rather than imported from `temper-progress`.",
    },
    {
      invariantKind: "departure",
      statement: "The temper task count is read with the same reader the temper module uses.",
    },
    {
      invariantKind: "departure",
      statement:
        "A source that cannot be read stops that source's readings and no other source's readings.",
    },
    {
      invariantKind: "departure",
      statement: "Every readout this run kept no number for is named on stderr.",
    },
    {
      invariantKind: "departure",
      statement: "A readout nothing was kept for is left on the number taken before that run.",
    },
    {
      invariantKind: "departure",
      statement: "A run that could not read a source has not succeeded.",
    },
    {
      invariantKind: "departure",
      statement: "A run that kept no count at all exits 2.",
    },
    {
      invariantKind: "departure",
      statement: "A run that kept some counts and missed others exits 1.",
    },
    {
      invariantKind: "departure",
      statement: "A run of this file takes three readings.",
    },
    {
      invariantKind: "departure",
      statement:
        "The root read is the root the environment states or the root the call was made in.",
    },
    {
      invariantKind: "departure",
      statement: "Where each readout's page sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "departure",
      statement: "A readout the index names no page for stops the run rather than one reading.",
    },
    {
      invariantKind: "absence",
      statement: "The counts themselves are never printed.",
    },
    {
      invariantKind: "absence",
      statement: "Importing this file takes no reading.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
