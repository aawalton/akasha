import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const stateSubagent = {
  id: "01a0598f-18de-7467-a5af-de60b85fefd7",
  type: "page-type/agent-hook",
  slug: "state-subagent",
  definition: "a subagent's page, put up when it starts and taken away when it stops",
  code: "ts",
  test: "ts",
  runsAt: ["SubagentStart", "SubagentStop"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent that exists is a page that exists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent its seat has seen return has no page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stop ends a turn rather than a subagent, so a stop alone takes no page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A subagent the seat's transcript still names as one that has not returned keeps its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent resuming takes up the page that subagent had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat is named by the page the index has for the id the call runs under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A payload naming no subagent leaves the subagent pages unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A start naming no kind puts up nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This hook changes the subagent pages rather than judging a call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This hook refuses nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The subagent begins and ends either way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A start waits for the index to file the subagent's page before the subagent begins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A start waits at most five seconds short of the time a hook is given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A start stops waiting once the landing it asked for has ended, filed or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A start past that wait lets the subagent begin, and its first read waits on its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat's id reaches the take-down as the seat's id reaches the put-up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing refused after this hook stepped aside leaves its reason in a log.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A page a refusal left unwritten is put up from that log.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The landing left to finish here and the restore of a dirty akasha take one lock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page half-landed by a process that died is swept by the next process to take that lock.",
    },
  ],
} as const satisfies AgentHook
