import type { Module } from "@akasha/code/module"

export const pushRepo = {
  id: "01a06977-65e5-7e5f-8bc6-bd63299bc924",
  pageTypeSlug: "module",
  type: "module",
  slug: "push-repo",
  definition: "a repository's commits carried to its remote by a program nothing waits on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One pusher works a repository at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A second pusher exits rather than queueing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pusher re-reads the tip after each round and has whatever landed while that pusher worked.",
    },
    {
      invariantKind: "departure",
      statement: "A push's outcome is left in a state file rather than said to a caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here waits on a push.",
    },
  ],
} as const satisfies Module
