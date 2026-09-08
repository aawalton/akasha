import type { AgentHook } from "../agent-hook.page-type.ts"

export const blockCombinedAkashaCalls = {
  id: "01a07e9e-a423-744c-8496-5006c4bbb90d",
  pageTypeSlug: "agent-hook",
  slug: "block-combined-akasha-calls",
  definition: "a refusal of an `akasha read` or `akasha change` call combined with other shell",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A command naming `akasha read` is refused unless the whole command is an approved read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command naming `akasha change` is refused unless the whole command is an approved change.",
    },
    {
      invariantKind: "departure",
      statement: "The whole command is matched rather than the calls the command carries.",
    },
    {
      invariantKind: "departure",
      statement: "An approved read carries `--file-path` flags.",
    },
    {
      invariantKind: "departure",
      statement: "An approved read carries no other word.",
    },
    {
      invariantKind: "departure",
      statement: "An approved change carries the act.",
    },
    {
      invariantKind: "departure",
      statement: "An approved change carries the words that act takes.",
    },
    {
      invariantKind: "departure",
      statement: "An approved change opens one heredoc.",
    },
    {
      invariantKind: "departure",
      statement: "The delimiter opening that heredoc is quoted.",
    },
    {
      invariantKind: "departure",
      statement: "The line closing that heredoc is the last line of the command.",
    },
    {
      invariantKind: "departure",
      statement: "Text naming a command inside a quoted run is refused as a call is.",
    },
    {
      invariantKind: "absence",
      statement: "Every akasha command but `read` and `change` is no business of this hook.",
    },
    {
      invariantKind: "constraint",
      statement: "A read is recorded against the agent that ran the read.",
    },
    {
      invariantKind: "constraint",
      statement: "The command the record shows is the command that ran.",
    },
    {
      invariantKind: "constraint",
      statement:
        "An unquoted delimiter lets the shell rewrite a body before akasha reads the body.",
    },
    {
      invariantKind: "constraint",
      statement: "No approved form carries shell structure.",
    },
    {
      invariantKind: "gap",
      statement: "`akasha` reached by a name other than `akasha` is not named here.",
    },
  ],
} as const satisfies AgentHook
