import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const weighBashCall = {
  id: "01a0925f-7a0c-7b9c-9414-3402ab8afe91",
  type: "page-type/agent-hook",
  slug: "weigh-bash-call",
  definition:
    "the hook putting a bash call in a group of its own so what that call spends is known",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This hook judges nothing and refuses no call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call is handed back with the line reading the weighing script above it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The command an agent wrote is left whole below that line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This hook is named to sort after every hook that judges a bash call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each of those judges the command the agent wrote rather than the wrapped one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The script is reached through the index rather than by a path spelled here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "What a call spent is appended beside the page of the seat the call was made from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call a subagent made is weighed against that subagent's seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which file the line goes in is settled here, so a line rolls at the ceiling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fill is judged by the whole line rather than by the line's opening.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rest of that line is written by the shell and counted at its widest.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A call is named by the first line the agent wrote rather than by the whole command.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A word handed to the shell is quoted so the shell reads that word whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The groups calls left behind are taken away as the next call opens.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group named for a process still running is left where it is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call this could not weigh is handed back unchanged rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat whose page is not there is a call handed back unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A throw anywhere here is a call handed back unchanged.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads what the call answered.",
    },
  ],
} as const satisfies AgentHook
