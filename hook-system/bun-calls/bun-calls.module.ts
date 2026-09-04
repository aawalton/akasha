import type { Module } from "@akasha/code-system/module"

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
      statement: "A flag before the act is stepped over.",
    },
    {
      invariantKind: "departure",
      statement: "A flag that takes a value takes the word after the flag.",
    },
    {
      invariantKind: "departure",
      statement: "That word is no act.",
    },
    {
      invariantKind: "departure",
      statement: "What follows the act is returned unread.",
    },
    {
      invariantKind: "departure",
      statement: "The script a `run` names is read past the flags before the script.",
    },
    {
      invariantKind: "departure",
      statement: "A `run` naming no script past its flags names no script.",
    },
    {
      invariantKind: "departure",
      statement: "No act but `run` names a script.",
    },
    {
      invariantKind: "departure",
      statement: "A command carrying no act is no call here.",
    },
    {
      invariantKind: "absence",
      statement: "An act is read here rather than judged.",
    },
    {
      invariantKind: "absence",
      statement: "The cutting is `shell-calls`.",
    },
    {
      invariantKind: "absence",
      statement: "The stepping over of a prefix is `shell-calls` too.",
    },
    {
      invariantKind: "absence",
      statement: "No rule about quoting or basenames stands here.",
    },
  ],
} as const satisfies Module
