import type { Module } from "@akasha/code-system/module"

export const watcherTaskLanding = {
  id: "01a06381-35cf-7c4d-b5f1-4ad42ef2b4cc",
  pageTypeSlug: "module",
  slug: "watcher-task-landing",
  definition: "a temper task's whole body written back with the keys a completion changes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The store takes a path and a whole body rather than the keys a page carries.",
    },
    {
      invariantKind: "departure",
      statement: "A key the body already carries is restated in place.",
    },
    {
      invariantKind: "departure",
      statement: "A key the body carries nowhere is added on the line before the closing.",
    },
    {
      invariantKind: "departure",
      statement: "A key told null is taken off the body.",
    },
    {
      invariantKind: "departure",
      statement: "Only a key indented by two spaces is matched.",
    },
    {
      invariantKind: "departure",
      statement: "A body carrying no closing line is refused rather than guessed at.",
    },
    {
      invariantKind: "departure",
      statement: "A body nothing would move on counts as landed.",
    },
    {
      invariantKind: "departure",
      statement: "A body the store holds nothing for is refused rather than made.",
    },
    {
      invariantKind: "departure",
      statement: "A task that will not come round again is taken away.",
    },
    {
      invariantKind: "departure",
      statement: "Files beside a task are taken away with the task.",
    },
    {
      invariantKind: "departure",
      statement: "A path already gone counts as taken away.",
    },
    {
      invariantKind: "departure",
      statement: "Each attempt reads the task afresh.",
    },
    {
      invariantKind: "departure",
      statement: "The caller states the commit message.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what a completion changes about a task.",
    },
  ],
} as const satisfies Module
