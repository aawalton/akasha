import type { SupervisorAction } from "akasha/agent/seat/supervisor/supervisor-action/supervisor-action.page-type.types.ts"

export const regret = {
  id: "01a16fed-a2bb-7494-a344-1767989fdf1d",
  type: "page-type/supervisor-action",
  slug: "regret",
  definition: "a person's message taken back from a seat while the seat replies to that message",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This action interrupts the agent's turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The agent starts again in the same session, with its transcript cut to before the message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The agent is told nothing of the message or of starting again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message the transcript refuses to be cut for leaves the agent running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The request is cleared only once the transcript is cut or the cut is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message page still there is taken, so nothing offers the message again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No reply is pushed to a person from the signal until the cut.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing undoes what the agent did outside its transcript before the signal.",
    },
  ],
  createdAt: "2026-10-24T22:00:07.098Z",
  updatedAt: "2026-10-24T22:00:07.098Z",
} as const satisfies SupervisorAction
