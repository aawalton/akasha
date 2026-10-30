import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorInteractive = {
  id: "01a06871-3115-700a-b93f-c32bdd8735c6",
  type: "page-type/module",
  slug: "supervisor-interactive",
  definition: "how code runs the processes of a seat's agent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The loop goes round only when the supervisor killed the child and no shutdown is under way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An exit the supervisor did not ask for is named a user's only where the child exited cleanly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A null child from adoption ends the loop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is spawned in the place of a null child.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "exit-after-iterations counts the iterations already begun.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The loop runs exactly the count exit-after-iterations states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The agent id and session id and resume and prompt are loop variables rewritten each round.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A null pending event at exit breaks the loop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The idle probe reads the Claude pid through a closure that is empty on the first pass.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every exit path runs the same finalize step over the last child and the proxy.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here spawns a child or wires its streams or reads a word of its output.",
    },
  ],
  createdAt: "2026-09-03T18:04:03.733Z",
  updatedAt: "2026-10-30T14:51:27.861Z",
} as const satisfies Module
