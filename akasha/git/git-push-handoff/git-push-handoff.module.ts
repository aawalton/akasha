import type { Module } from "@akasha/code-system/module"

export const gitPushHandoff = {
  id: "01a068b3-8055-7000-b301-1ef5cf968dde",
  pageTypeSlug: "module",
  slug: "git-push-handoff",
  definition:
    "the push handed to a background process, so a landing reports without waiting on the network",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A checkout with no remote hands off nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "One push runs per checkout at a time, held by a lock file naming the process that took it.",
    },
    {
      invariantKind: "departure",
      statement: "A lock whose holder is no longer alive is cleared and taken.",
    },
    {
      invariantKind: "departure",
      statement:
        "A hand-off that cannot start says the commit is already durable locally and what to run instead.",
    },
    {
      invariantKind: "departure",
      statement: "The state file records what the last push did, so a later landing can report it.",
    },
  ],
} as const satisfies Module
