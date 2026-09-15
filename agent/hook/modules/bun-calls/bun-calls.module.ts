import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bunCalls = {
  id: "01a04eab-d4ef-7000-bdff-3446eef0bf24",
  type: "page-type/module",
  slug: "bun-calls",
  definition: "the bun invocations a shell command line carries",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag before the act is stepped over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag that takes a value takes the word after the flag.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That word is no act.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The words after the act are returned unread.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The script a `run` names is read past the flags before the script.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `run` naming no script past its flags names no script.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No act but `run` names a script.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command with no act is no call here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "An act is read here rather than judged.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The cutting is `shell-calls`.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "No rule about quoting or basenames exists here.",
    },
  ],
} as const satisfies Module
