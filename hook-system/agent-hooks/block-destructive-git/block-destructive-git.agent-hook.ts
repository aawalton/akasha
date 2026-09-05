import type { AgentHook } from "../agent-hook.page-type.ts"

export const blockDestructiveGit = {
  id: "01a04e16-d380-7002-bd31-c3ca7eb9bdc8",
  pageTypeSlug: "agent-hook",
  slug: "block-destructive-git",
  definition: "a refusal of the git calls that destroy work a shared worktree holds",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An act named here is refused wherever that act is.",
    },
    {
      invariantKind: "departure",
      statement: "No path narrows the refusal.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal says the work the call would destroy rather than that the call looks unusual.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names the akasha command that does the act asked for or says no akasha command does.",
    },
    {
      invariantKind: "departure",
      statement:
        "A prefix that only runs the call behind that prefix does not hide a git act from this hook.",
    },
    {
      invariantKind: "absence",
      statement: "An act this hook does not name is unexamined rather than safe.",
    },
    {
      invariantKind: "constraint",
      statement: "Git classifies no act by this hazard.",
    },
    {
      invariantKind: "constraint",
      statement: "The list here is a sample rather than a set.",
    },
    {
      invariantKind: "gap",
      statement: "One git call does not take away work another agent has not landed.",
    },
  ],
} as const satisfies AgentHook
