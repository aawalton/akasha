import type { Module } from "@akasha/code-system/module"

export const pushRepo = {
  id: "01a06977-65e5-7e5f-8bc6-bd63299bc924",
  pageTypeSlug: "module",
  slug: "push-repo",
  definition: "a repository's commits carried to its remote by a program nothing waits on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "One pusher works a repository at a time, and a second one exits rather than queueing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pusher re-reads the tip after each round and carries whatever landed while it worked.",
    },
    {
      invariantKind: "departure",
      statement: "What a push did is left in a state file rather than said to a caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here waits on a push, because a write is durable at its commit.",
    },
  ],
} as const satisfies Module
