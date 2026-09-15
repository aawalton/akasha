import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chapterAlerts = {
  id: "01a0a114-1db7-7ff6-a448-374b26986286",
  type: "module",
  slug: "chapter-alerts",
  definition: "the sound and the notice a story's newest chapter raises for the person reading it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A story the person does not follow sounds nothing and asks for no permission.",
    },
    {
      invariantKind: "departure",
      statement: "The first frontier seen is recorded rather than raised as a new chapter.",
    },
    {
      invariantKind: "departure",
      statement: "An alert raises only where the newest chapter differs from the one last seen.",
    },
    {
      invariantKind: "departure",
      statement: "The audio waits for a pointer or a key, because a browser starts it suspended.",
    },
  ],
} as const satisfies Module
