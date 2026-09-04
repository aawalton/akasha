import type { Module } from "@akasha/code-system/module"

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
      statement: "A global flag that takes a value takes the word after that flag.",
    },
    {
      invariantKind: "departure",
      statement: "That word is no act.",
    },
    {
      invariantKind: "departure",
      statement: "A command carrying no act is no call here.",
    },
    {
      invariantKind: "departure",
      statement: "A word this names as another tool is no git call whatever its act reads as.",
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
    {
      invariantKind: "gap",
      statement: "A hook reads a git act out of a command line without writing a shell parser.",
    },
  ],
} as const satisfies Module
