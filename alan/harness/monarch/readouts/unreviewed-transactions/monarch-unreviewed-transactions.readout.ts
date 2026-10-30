import type { Readout } from "akasha/alan/harness/readout/readout.page-type.types.ts"

export const monarchUnreviewedTransactions = {
  id: "01a053aa-fc5a-7708-b1fb-780b2ca58893",
  type: "page-type/readout",
  slug: "monarch-unreviewed-transactions",
  definition: "how many Monarch transactions wait for a person",
  reading: {},
  label: "Unreviewed",
  unit: "transactions",
  scale: "readout-scale/backlog-count",
  groups: [{ group: "readout-group/categorization", place: 1 }],
  noneLeftWords: "All reviewed!",
  noneLeftEmoji: "🎉",
  wireKey: "unreviewed",
  readLiveFrom: "domain/monarch",
  servedBy: [
    "route/categorization",
    "route/jenny-categorization",
    "module/monarch-reading",
    "service-workstation/monarch-relay-service",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Unreviewed is counted over the year that ends on the day the number is taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only settled transactions are counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The whole Cookie header is taken in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The X-CSRFToken header is split out of its `csrftoken=` value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Monarch answer that is not OK is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fault on Monarch's side or a dropped connection is asked again before taking the number fails.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call gives up after ten seconds.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here caches a number or decides when a number is taken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing is counted that is not shown.",
    },
  ],
  carriedTo: ["router-app/alan-web", "router-app/smilingjenny-web"],
  createdAt: "2026-08-30T17:15:09.786Z",
  updatedAt: "2026-10-30T17:23:01.787Z",
} as const satisfies Readout
