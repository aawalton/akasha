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
      statement: "A verb named here is refused wherever it stands.",
    },
    {
      invariantKind: "departure",
      statement: "No path narrows it.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal says what the call would destroy rather than that it looks unusual.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the akasha command that does what was asked or says none does.",
    },
    {
      invariantKind: "departure",
      statement: "What this does not reach is printed by the hook and asked for with `--scope`.",
    },
    {
      invariantKind: "absence",
      statement: "A verb this does not name is unexamined rather than safe.",
    },
    {
      invariantKind: "constraint",
      statement: "Git classifies no verb by this hazard.",
    },
    {
      invariantKind: "constraint",
      statement: "The list here is a sample rather than a set.",
    },
    {
      invariantKind: "constraint",
      statement: "A longer list is a longer search prompt. A gap is reported and never filled.",
    },
    {
      invariantKind: "gap",
      statement: "One git call does not take away work another agent has not landed.",
    },
  ],
} as const satisfies AgentHook
