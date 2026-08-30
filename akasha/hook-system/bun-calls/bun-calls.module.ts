import type { Module } from "../../code-system/module/module.page-type.ts"

export const bunCalls = {
  id: "01a04eab-d4ef-7000-bdff-3446eef0bf24",
  pageTypeSlug: "module",
  slug: "bun-calls",
  definition: "the bun invocations a shell command line carries",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A prefix that sets a call up is stepped over.",
    },
    {
      invariantKind: "departure",
      statement: "The call behind it is read.",
    },
    {
      invariantKind: "departure",
      statement: "A flag that takes a value takes the word after it.",
    },
    {
      invariantKind: "departure",
      statement: "That word is no verb.",
    },
    {
      invariantKind: "departure",
      statement: "What follows the verb is returned unread.",
    },
    {
      invariantKind: "departure",
      statement: "A command carrying no verb is no call here.",
    },
    {
      invariantKind: "absence",
      statement: "A verb is read here rather than judged.",
    },
    {
      invariantKind: "absence",
      statement: "The cutting is `shell-calls`. No rule about quoting or basenames stands here.",
    },
  ],
} as const satisfies Module
