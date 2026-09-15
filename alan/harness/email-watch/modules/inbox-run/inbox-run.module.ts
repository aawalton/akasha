import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inboxRun = {
  id: "01a06596-a92d-7000-8626-c02c9e56a331",
  type: "module",
  slug: "inbox-run",
  definition: "one run over the inbox carrying out what the rules say, and the claims it keeps",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A message on a persona channel Alan sent is claimed for that persona rather than judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message discarded off a channel is left in the inbox for the reader to clear.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The channels and the watched address are read once a run rather than a message.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message already claimed is skipped rather than judged again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A claim on a message that has left the inbox is cleared.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule with a delay claims the message and acts when the delay is up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message matching no rule is recorded as unclaimed and left in the inbox.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unsubscribe is taken only where the sender offers one click.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dry run writes neither the state nor the action log.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule that throws is recorded as failed and the run carries on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A message forwarded is named before the unsubscribe that follows, which can throw.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An unsubscribe taken is named before the archiving that follows, which can throw.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message archived is named as soon as Gmail has taken it out of the inbox.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule recorded as failed carries what that rule had already carried out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each message is carried with a list of its own, gathered into the run's after.",
    },
  ],
} as const satisfies Module
