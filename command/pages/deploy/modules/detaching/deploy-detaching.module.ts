import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployDetaching = {
  id: "01a15b06-be25-778e-904d-5591081e5f6a",
  type: "page-type/module",
  slug: "deploy-detaching",
  definition: "a deploy run apart from the shell that called it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy called from the command line runs as a user service of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Ending the shell that called a deploy leaves that deploy running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deploy called from code, in the cluster or in its own service is not run apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The service is handed every name in the caller's environment but the agent's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A detached deploy acts for no agent, so no sweep of an agent's processes ends it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The call names the service and its log before anything else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The call says what the deploy says as the log grows, and ends with its code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every ending of the service is written beside its log, a signal included.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That ending is written by a script beside the log, so the unit holds no dollar.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A reload of the user manager while the service runs reads its unit again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy ended by a signal or a ceiling is refused, naming how it ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service gone with no ending written is refused rather than taken as done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call signalled while it waits says the deploy goes on and where its log is before ending.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service that will not start refuses the deploy rather than running it in place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deploy in its own service says when it waits behind another deploy of that thing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "It names the process of the deploy it waits behind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call whose deploy says it waits ends there, and the deploy goes on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That call names the service and the log whose end says how the deploy ended.",
    },
  ],
  createdAt: "2026-10-20T20:35:30.979Z",
  updatedAt: "2026-10-24T21:57:27.795Z",
} as const satisfies Module
