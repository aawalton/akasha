import type { Module } from "@akasha/code-system/module"

export const nextBossSavedVariables = {
  id: "01a06157-8358-7649-943c-84dc225013dc",
  pageTypeSlug: "module",
  slug: "next-boss-saved-variables",
  definition: "what this tracker keeps between sessions, and what it starts at",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What is kept is kept for the whole account rather than for one character.",
    },
    {
      invariantKind: "departure",
      statement:
        "The timers kept are read back only where the campaign is the one they were kept under.",
    },
  ],
} as const satisfies Module
