import type { AgentHook } from "../agent-hook.page-type.ts"

export const blockOpsCli = {
  id: "01a06863-1006-722c-a05f-305541451b14",
  pageTypeSlug: "agent-hook",
  slug: "block-ops-cli",
  definition: "a refusal of every call that runs the ops CLI",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every call that runs the ops CLI is refused whatever it asks of it.",
    },
    {
      invariantKind: "departure",
      statement: "The CLI reached by a path is the same call and is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A prefix that only runs the call behind it does not hide this one from it.",
    },
    {
      invariantKind: "departure",
      statement: "A name set before the call is not the call.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names what answers instead of each thing the CLI did.",
    },
    {
      invariantKind: "departure",
      statement: "Where the call runs is not read, because the CLI is reached by a name on PATH.",
    },
    {
      invariantKind: "departure",
      statement: "A run inside quotes is taken out before the cut, so text is not read as a call.",
    },
    {
      invariantKind: "absence",
      statement: "A word only holding the name inside it is no call to the CLI.",
    },
    {
      invariantKind: "gap",
      statement:
        "A call naming the dispatcher's own file rather than the command is not read here.",
    },
  ],
} as const satisfies AgentHook
