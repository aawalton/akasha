import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gitCalls = {
  id: "01a04e16-d380-7000-aca5-c084a6730236",
  type: "page-type/module",
  slug: "git-calls",
  definition: "the git invocations a shell command line carries",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A global flag that takes a value takes the word after that flag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That word is no act.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words before the act are kept with it, in the order the line has them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command with no act is no call here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word this names as another tool is no git call whatever its act is taken as.",
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
    {
      decisionKind: "decision-kind/gap",
      statement: "A hook reads a git act out of a command line without writing a shell parser.",
    },
  ],
} as const satisfies Module
