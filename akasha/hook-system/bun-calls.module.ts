import type { Module } from "../code-system/module/module.page-type.ts"

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
      statement: "A command line is cut into segments before any word in it is read as a call.",
    },
    {
      invariantKind: "departure",
      statement: "The word that runs a call is matched by its basename, so a path to bun is bun.",
    },
    {
      invariantKind: "departure",
      statement: "A prefix that sets a call up is stepped over, and the call behind it is read.",
    },
    {
      invariantKind: "departure",
      statement: "A flag that takes a value takes the word after it, which is no verb.",
    },
    {
      invariantKind: "departure",
      statement: "What follows the verb is returned unread, so a filter is never taken for a flag.",
    },
    {
      invariantKind: "departure",
      statement: "A command carrying no verb is no call here.",
    },
    {
      invariantKind: "absence",
      statement: "A verb is read here, never judged.",
    },
    {
      invariantKind: "constraint",
      statement: "This reads a shell command line without being a shell.",
    },
  ],
} as const satisfies Module
