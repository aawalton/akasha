import type { AgentHook } from "../agent-hook.page-type.types.ts"

export const blockCombinedAkashaCalls = {
  id: "01a07e9e-a423-744c-8496-5006c4bbb90d",
  pageTypeSlug: "agent-hook",
  type: "agent-hook",
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
      statement: "The whole command is matched rather than the calls the command has.",
    },
    {
      invariantKind: "departure",
      statement: "An approved read has `--file-path` flags.",
    },
    {
      invariantKind: "departure",
      statement: "A path a read names is a bare word or a run in single quotes.",
    },
    {
      invariantKind: "constraint",
      statement: "A run in single quotes reaches the program as the run was written.",
    },
    {
      invariantKind: "departure",
      statement: "A path no read can name is a path no change can write or take away.",
    },
    {
      invariantKind: "departure",
      statement: "An approved read carries `--full`.",
    },
    {
      invariantKind: "departure",
      statement: "An approved read has no other word.",
    },
    {
      invariantKind: "departure",
      statement: "An approved change has the change command.",
    },
    {
      invariantKind: "departure",
      statement: "An approved change has the one word that command takes.",
    },
    {
      invariantKind: "departure",
      statement: "An approved change opens one heredoc or none.",
    },
    {
      invariantKind: "departure",
      statement: "The apply that lands is a change command rather than a call of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The delimiter opening that heredoc is quoted.",
    },
    {
      invariantKind: "departure",
      statement: "The delimiter opening that heredoc is `HEREDOC`.",
    },
    {
      invariantKind: "departure",
      statement: "The delimiter occurs as a line once in the whole command.",
    },
    {
      invariantKind: "departure",
      statement: "The line closing that heredoc is the last line of the command.",
    },
    {
      invariantKind: "departure",
      statement:
        "Text naming a command inside a quoted run is refused where the command opens with another word.",
    },
    {
      invariantKind: "departure",
      statement: "A quoted run the shell would not rewrite is taken out before the trigger.",
    },
    {
      invariantKind: "departure",
      statement: "A run is taken out only where the command opens with `akasha`.",
    },
    {
      invariantKind: "departure",
      statement: "A run with a character the shell rewrites is left in.",
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
      statement: "No approved form has shell structure.",
    },
    {
      invariantKind: "gap",
      statement: "`akasha` reached by a name other than `akasha` is not named here.",
    },
  ],
} as const satisfies AgentHook
