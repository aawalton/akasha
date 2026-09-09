import type { Module } from "@akasha/code/module"

export const gitPushHandoff = {
  id: "01a068b3-8055-7000-b301-1ef5cf968dde",
  pageTypeSlug: "module",
  type: "module",
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
      statement: "One push runs per checkout at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A lock file names the process that took the push lock.",
    },
    {
      invariantKind: "departure",
      statement: "A lock whose holder is no longer alive is cleared and taken.",
    },
    {
      invariantKind: "departure",
      statement:
        "A hand-off that cannot start says the commit is already durable locally and the push to run instead.",
    },
    {
      invariantKind: "departure",
      statement: "The state file records the last push's outcome.",
    },
    {
      invariantKind: "departure",
      statement: "A later landing reports that outcome.",
    },
  ],
} as const satisfies Module
