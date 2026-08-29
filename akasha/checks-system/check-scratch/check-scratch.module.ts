import type { Module } from "../../code-system/module/module.page-type.ts"

export const checkScratch = {
  id: "01a04fd0-8a9a-7915-a355-32d5432a7f11",
  pageTypeSlug: "module",
  slug: "check-scratch",
  definition: "an index stood up in a scratch root for a check's test to judge against",
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
