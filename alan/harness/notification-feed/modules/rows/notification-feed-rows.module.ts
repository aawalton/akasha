import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const notificationFeedRows = {
  id: "01a069b6-bb6b-7ec9-bdcf-8f130bb46a4d",
  type: "module",
  slug: "notification-feed-rows",
  definition: "one person's notifications, read from and written to the feed page's own sidecar",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A notification is a row in a feed's sidecar rather than a page of its own.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A row is keyed by each property's propertySlug.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A property page's own slug never keys a row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A feed is reached by the path of its page file rather than by the person's name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The key order a row is written in is the key order every row already there carries.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A row has no sequence number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every feed is read rather than only the one feed there is today.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A feed that cannot be read is a throw.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Unreadable is never answered as nothing said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A person with no feed is a throw rather than a refusal handed back.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No reader here crosses a network.",
    },
  ],
} as const satisfies Module
