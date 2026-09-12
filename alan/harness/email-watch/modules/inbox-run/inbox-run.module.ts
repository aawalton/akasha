import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inboxRun = {
  id: "01a06596-a92d-7000-8626-c02c9e56a331",
  type: "module",
  slug: "inbox-run",
  definition: "one run over the inbox carrying out what the rules say, and the claims it keeps",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message already claimed is skipped rather than judged again.",
    },
    {
      invariantKind: "departure",
      statement: "A claim on a message that has left the inbox is cleared.",
    },
    {
      invariantKind: "departure",
      statement: "A rule with a delay claims the message and acts when the delay is up.",
    },
    {
      invariantKind: "departure",
      statement: "A message matching no rule is recorded as unclaimed and left in the inbox.",
    },
    {
      invariantKind: "departure",
      statement: "An unsubscribe is taken only where the sender offers one click.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run writes neither the state nor the action log.",
    },
    {
      invariantKind: "departure",
      statement: "A rule that throws is recorded as failed and the run carries on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A message forwarded is named before the unsubscribe that follows, which can throw.",
    },
    {
      invariantKind: "departure",
      statement:
        "An unsubscribe taken is named before the archiving that follows, which can throw.",
    },
    {
      invariantKind: "departure",
      statement: "A message archived is named as soon as Gmail has taken it out of the inbox.",
    },
    {
      invariantKind: "departure",
      statement: "A rule recorded as failed carries what that rule had already carried out.",
    },
    {
      invariantKind: "departure",
      statement: "Each message is carried with a list of its own, gathered into the run's after.",
    },
  ],
} as const satisfies Module
