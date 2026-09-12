import type { AgentHook } from "akasha/agents/hooks/agent-hooks/agent-hook.page-type.types.ts"

export const weighBashCall = {
  id: "01a0925f-7a0c-7b9c-9414-3402ab8afe91",
  type: "agent-hook",
  slug: "weigh-bash-call",
  definition: "the hook over a bash call handing every call back unchanged",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This hook judges nothing and refuses no call.",
    },
    {
      invariantKind: "departure",
      statement: "The command an agent wrote is handed back whole.",
    },
    {
      invariantKind: "departure",
      statement: "A registration settled at a spawn names this hook's code file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what the call said or what the call did.",
    },
    {
      invariantKind: "absence",
      statement: "No call is put in a control group of its own.",
    },
    {
      invariantKind: "absence",
      statement: "What a bash call spent is appended beside no page.",
    },
    {
      invariantKind: "absence",
      statement:
        "The wall time, processor seconds and peak memory of a bash call are measured nowhere.",
    },
    {
      invariantKind: "constraint",
      statement: "A hook the harness spawns that judges nothing costs a spawn on every call.",
    },
  ],
} as const satisfies AgentHook
