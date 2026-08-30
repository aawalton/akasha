import type { Readout } from "../../readout.page-type.ts"

export const monarchUnreviewedTransactions = {
  id: "01a053aa-fc5a-7708-b1fb-780b2ca58893",
  pageTypeSlug: "readout",
  slug: "monarch-unreviewed-transactions",
  definition: "how many transactions are unreviewed",
  code: "ts",
  label: "Unreviewed",
  unit: "transactions",
  place: 1,
  scaleSlug: "backlog-count",
  groupSlugs: ["categorization"],
  noneLeftWords: "All reviewed!",
  noneLeftEmoji: "🎉",
  wireKey: "unreviewed",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One query answers the unreviewed, total and intake counts together.",
    },
    {
      invariantKind: "departure",
      statement: "Unreviewed and total are counted over a year, and intake over a month.",
    },
    {
      invariantKind: "departure",
      statement: "Only settled transactions are counted.",
    },
    {
      invariantKind: "departure",
      statement:
        "The whole Cookie header is taken in, and the X-CSRFToken header is split out of its `csrftoken=` value.",
    },
    {
      invariantKind: "departure",
      statement: "A Monarch answer that is not OK is refused as a dead credential.",
    },
    {
      invariantKind: "departure",
      statement: "A call gives up after ten seconds.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here caches a reading or decides when one is taken.",
    },
  ],
} as const satisfies Readout
