import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockDestructiveGit = {
  id: "01a04e16-d380-7002-bd31-c3ca7eb9bdc8",
  type: "page-type/agent-hook",
  slug: "block-destructive-git",
  definition: "a refusal of the git commands that remove work",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An act named here is refused wherever the line holds that act.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No path narrows the refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal says the work the call would destroy rather than that the call looks unusual.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal names the akasha command that does the act asked for or says no akasha command does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A prefix that only runs the call behind that prefix does not hide a git act from this hook.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An act this hook does not name is unexamined rather than safe.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Git classifies no act by this hazard.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The list here is a sample rather than a set.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "One git call does not take away work another agent has not landed.",
    },
  ],
} as const satisfies AgentHook
