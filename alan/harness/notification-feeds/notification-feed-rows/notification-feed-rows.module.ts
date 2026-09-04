import type { Module } from "@akasha/code-system/module"

export const notificationFeedRows = {
  id: "01a069b6-bb6b-7ec9-bdcf-8f130bb46a4d",
  pageTypeSlug: "module",
  slug: "notification-feed-rows",
  definition: "one person's notifications, read from and written to the feed page's own sidecar",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A notification is a row in a feed's sidecar rather than a page of its own.",
    },
    {
      invariantKind: "constraint",
      statement: "A row is keyed by each property's propertySlug.",
    },
    {
      invariantKind: "constraint",
      statement: "A property page's own slug never keys a row.",
    },
    {
      invariantKind: "departure",
      statement: "A feed is reached by the path of its page file rather than by the person's name.",
    },
    {
      invariantKind: "departure",
      statement:
        "The key order a row is written in is the key order every row already there carries.",
    },
    {
      invariantKind: "absence",
      statement: "A row carries no sequence number.",
    },
    {
      invariantKind: "departure",
      statement: "Every feed is read rather than only the one feed there is today.",
    },
    {
      invariantKind: "departure",
      statement: "A feed that cannot be read is a throw.",
    },
    {
      invariantKind: "constraint",
      statement: "Unreadable is never answered as nothing said.",
    },
    {
      invariantKind: "departure",
      statement: "A person with no feed is a throw rather than a refusal handed back.",
    },
    {
      invariantKind: "absence",
      statement: "No reader here crosses a network.",
    },
  ],
} as const satisfies Module
