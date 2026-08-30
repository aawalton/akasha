import type { Module } from "../../code-system/module/module.page-type.ts"

export const checkScratch = {
  id: "01a04fd0-8a9a-7915-a355-32d5432a7f11",
  pageTypeSlug: "module",
  slug: "check-scratch",
  definition:
    "what a check's test judges: an index stood up in a scratch root, and the change read against it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Where an index stands is reached through the composer that says it, so a test standing one up never spells the path a refusal would name.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry is one line of JSON in a file named for what it answers to, because that is the shape the index is read back in, not a shape convenient to write.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a relation points at is handed in rather than assumed, because two checks reading the same edge expect it to land on different pages.",
    },
    {
      invariantKind: "departure",
      statement:
        "A scratch index says its schema, because identity is filed only under the properties a `unique` names, and a reading naming none refuses rather than answering empty.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change is read as the bodies it proposes, falling back to what stands on disk, because a check judging the disk would judge what the change has not done yet.",
    },
    {
      invariantKind: "absence",
      statement:
        "No root is made or swept here. A test says where its scratch stands and how long it lives, and this only writes into it.",
    },
    {
      invariantKind: "absence",
      statement:
        "No test is written here, as none is written for hook-payload or bodying. What stands here is stood up by the check tests that reach for it.",
    },
  ],
} as const satisfies Module
