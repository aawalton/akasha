import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bunCalls = {
  id: "01a04eab-d4ef-7000-bdff-3446eef0bf24",
  type: "page-type/module",
  slug: "bun-calls",
  definition: "the Bun calls in a shell command",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A flag before the act is stepped over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A flag that takes a value takes the word after the flag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That word is no act.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words after the act are returned unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The script a `run` names is read past the flags before the script.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `run` naming no script past its flags names no script.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No act but `run` names a script.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command with no act is no call here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An act is read here rather than judged.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The cutting is `shell-calls`.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "No rule about quoting or basenames exists here.",
    },
  ],
  createdAt: "2026-08-29T17:57:59.151Z",
  updatedAt: "2026-10-19T18:00:46.393Z",
} as const satisfies Module
