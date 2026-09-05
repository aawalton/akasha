import type { Module } from "@akasha/code-system/module"

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
        "Where an index stands is reached through the composer that says where the index is.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is one line of JSON in a file named for what the entry answers to.",
    },
    {
      invariantKind: "departure",
      statement: "What a relation points at is handed in rather than assumed.",
    },
    {
      invariantKind: "departure",
      statement: "A scratch index says its schema.",
    },
    {
      invariantKind: "departure",
      statement: "Identity is filed only under the properties a `unique` names.",
    },
    {
      invariantKind: "departure",
      statement: "A reading naming none refuses rather than answering empty.",
    },
    {
      invariantKind: "departure",
      statement: "A change is read as the bodies the change proposes.",
    },
    {
      invariantKind: "departure",
      statement: "A change falls back to what stands on disk.",
    },
    {
      invariantKind: "absence",
      statement: "No root is made or swept here.",
    },
    {
      invariantKind: "absence",
      statement: "A test says where its scratch stands and how long the scratch lives.",
    },
    {
      invariantKind: "absence",
      statement: "This module only writes into it.",
    },
    {
      invariantKind: "absence",
      statement: "No test is written here.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a page type declares is read from its value, so typing one files that value.",
    },
    {
      invariantKind: "departure",
      statement: "A page type files the types above it as a list, empty where it names none.",
    },
    {
      invariantKind: "absence",
      statement: "What stands here is stood up by the check tests that reach for what is here.",
    },
  ],
} as const satisfies Module
