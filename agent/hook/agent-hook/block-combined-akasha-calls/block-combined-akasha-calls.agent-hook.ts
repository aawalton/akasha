import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockCombinedAkashaCalls = {
  id: "01a07e9e-a423-744c-8496-5006c4bbb90d",
  type: "page-type/agent-hook",
  slug: "block-combined-akasha-calls",
  definition: "a refusal of an `akasha read` or `akasha change` call combined with other shell",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A command naming `akasha read` is refused unless the whole command is an approved read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A command naming `akasha change` is refused unless the whole command is an approved change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The whole command is matched rather than the calls the command has.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A hook reading a command word is blind to a call a substitution or a subshell holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Matching the whole command is what no substitution and no subshell gets past.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal quotes the command refused, as the shell was handed it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command longer than a few lines is quoted in part, and says how many are left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line longer than the width quoted is shortened rather than wrapped.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A refusal names no construct, because this hook looks for none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An approved read has `--file-path` flags.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path a read names is a bare word or a run in single quotes.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A run in single quotes reaches the program as the run was written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path no read can name is a path no change can write or take away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An approved read carries `--full`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An approved read has no other word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An approved change has the change command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An approved change has up to two words after `change`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An approved change carries `--draft` among or after those words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Those words name the command and what it takes, or the namespace and the command under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A help flag last on the line is approved on either name, however many words name the command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`-h` is the help flag as `--help` is.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Akasha answers a help flag from the command's page before the command is called.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A help call therefore records no read and makes no commit.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A command whose page will not load refuses the help flag as a word it does not take.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words before a help flag are lowercase letters, digits and hyphens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A help flag is the last word, and the line ends there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An approved change opens one heredoc or no heredoc.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The apply that lands is a change command rather than a call of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The delimiter opening that heredoc is quoted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The delimiter opening that heredoc is `HEREDOC`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The delimiter occurs as a line once in the whole command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line closing that heredoc is the last line of the command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of name-and-value assignments before an approved call is let through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value such an assignment carries is a bare word or a run in single quotes.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An assignment the shell sets runs nothing of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Text naming a command inside a quoted run is refused where the command opens with another word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quoted run the shell would not rewrite is taken out before the trigger.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run is taken out only where the command opens with `akasha`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run with a character the shell rewrites is left in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Every akasha command but `read` and `change` is no business of this hook.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A read is recorded against the agent that ran the read.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The command the record shows is the command that ran.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "An unquoted delimiter lets the shell rewrite a body before akasha reads the body.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "No approved form has shell structure.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "`akasha` reached under another name is judged as `akasha` named outright is.",
    },
  ],
} as const satisfies AgentHook
