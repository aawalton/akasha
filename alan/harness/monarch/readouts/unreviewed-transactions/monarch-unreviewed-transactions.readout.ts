import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const monarchUnreviewedTransactions = {
  id: "01a053aa-fc5a-7708-b1fb-780b2ca58893",
  type: "page-type/readout",
  slug: "monarch-unreviewed-transactions",
  definition: "how many transactions are unreviewed",
  reading: {},
  label: "Unreviewed",
  unit: "transactions",
  place: 1,
  scale: "readout-scale/backlog-count",
  groups: ["readout-group/categorization"],
  noneLeftWords: "All reviewed!",
  noneLeftEmoji: "🎉",
  wireKey: "unreviewed",
  readLiveFrom: "domain/monarch",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Unreviewed is counted over the year behind the reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only settled transactions are counted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The whole Cookie header is taken in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The X-CSRFToken header is split out of its `csrftoken=` value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A Monarch answer that is not OK is refused as a dead credential.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call gives up after ten seconds.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing is counted that is not shown.",
    },
  ],
} as const satisfies Readout
