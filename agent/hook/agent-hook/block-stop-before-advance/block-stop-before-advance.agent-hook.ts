import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockStopBeforeAdvance = {
  id: "01a0eb3d-438c-72de-b266-d745ddf00a87",
  type: "page-type/agent-hook",
  slug: "block-stop-before-advance",
  definition: "a refusal of a story reviewer's or story recorder's stop before its advance lands",
  code: "ts",
  test: "ts",
  runsAt: ["Stop"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stop is judged only where the seat's role is story reviewer or story recorder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The job a seat is judged against is the advance the last message it was sent names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stop is let through where the turn names the seat's job done, or has left that step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recorder's job waits at mechanics or at recorders, a reviewer's at reviewers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stop is let through where the turn the job names is no page any longer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stop is let through where the seat has sent a seat a message since the last message it was sent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stop is let through while a subagent or a background command of the seat runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A job's stop is refused at most four times, and let through after that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each seat is judged against its own job and no other seat's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stop nothing could judge is let through.",
    },
  ],
} as const satisfies AgentHook
