import type { Module } from "../../code-system/module/module.page-type.ts"

export const gitCalls = {
  id: "01a04e16-d380-7000-aca5-c084a6730236",
  pageTypeSlug: "module",
  slug: "git-calls",
  definition: "the git invocations a shell command line carries",
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
      statement: "A global flag that takes a value takes the word after it.",
    },
    {
      invariantKind: "departure",
      statement: "That word is no verb.",
    },
    {
      invariantKind: "departure",
      statement: "A command carrying no verb is no call here.",
    },
    {
      invariantKind: "departure",
      statement: "A word this names as another tool is no git call whatever its verb reads as.",
    },
    {
      invariantKind: "absence",
      statement: "A verb is read here rather than judged.",
    },
    {
      invariantKind: "absence",
      statement: "The cutting is `shell-calls`. No rule about quoting or basenames stands here.",
    },
    {
      invariantKind: "gap",
      statement: "A hook reads a git verb out of a command line without writing a shell parser.",
    },
  ],
} as const satisfies Module
