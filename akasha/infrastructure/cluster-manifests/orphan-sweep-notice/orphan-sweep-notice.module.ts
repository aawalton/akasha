import type { Module } from "@akasha/code-system/module"

export const orphanSweepNotice = {
  id: "01a0686c-fd2c-7006-a6f7-7aad69fb8bd6",
  pageTypeSlug: "module",
  slug: "orphan-sweep-notice",
  definition: "what a sweep reading is worth saying to the handler, and in what words",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sweep that found nothing says nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A sweep that could not run is a failed run rather than a message saying nothing drifted.",
    },
    {
      invariantKind: "departure",
      statement: "Every orphan is named with the deploy that manages it.",
    },
  ],
} as const satisfies Module
