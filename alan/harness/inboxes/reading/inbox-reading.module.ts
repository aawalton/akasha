import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const inboxReading = {
  id: "01a069bf-3919-77bc-a8a7-66b02d4185bf",
  pageTypeSlug: "module",
  slug: "inbox-reading",
  definition:
    "the counts on Alan's three inboxes, taken from his day and his mail and kept on their readouts",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is taken on the workstation carrying the checkout.",
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
      statement: "What to ask and how to read the answer are on each readout's own page.",
    },
    {
      invariantKind: "departure",
      statement: "Three inbox counts are read from two sources.",
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
      statement: "The mail count is on an `email-entry` page of its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "The mail entry is keyed by the day the inbox tracking poll writes that entry under.",
    },
    {
      invariantKind: "departure",
      statement: "Asking the ESO day would read the wrong mail entry on a day the two days differ.",
    },
    {
      invariantKind: "departure",
      statement: "The mail entry is asked for with `asking` rather than with `valuesOfType`.",
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
      statement: "`valuesOfType` answers a page type the index does not hold with no rows.",
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
      statement: "A source that cannot be read stops that source's readings and no others.",
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
      statement: "The root read is the one the environment states or the one the call was made in.",
    },
    {
      invariantKind: "stopgap",
      statement: "Each readout's path is spelled here rather than asked of the index.",
    },
    {
      invariantKind: "absence",
      statement: "The counts themselves are never printed.",
    },
    {
      invariantKind: "absence",
      statement: "Importing this file takes none.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when a reading is due.",
    },
  ],
} as const satisfies Module
