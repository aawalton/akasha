import type { Module } from "@akasha/code/module"

export const claudeAccountUsage = {
  id: "01a069cf-7042-7002-be6e-85399cf7d1f7",
  pageTypeSlug: "module",
  type: "module",
  slug: "claude-account-usage",
  definition: "what the fleet of claude accounts has spent, read off the account pages",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An account carrying no reading is left out of the mean.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout naming no account is refused rather than answered as a fleet.",
    },
  ],
} as const satisfies Module
