import type { Command } from "akasha/command/command.page-type.types.ts"

export const modelAccountLogin = {
  id: "01a0f115-66a6-7eea-81a3-a79433f9561f",
  type: "page-type/command",
  slug: "model-account-login",
  definition: "the command signing a model account back in for a person away from the machine",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A login runs in two calls: one answers the sign-in address, the next takes its code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The first call leaves the sign-in waiting in a tmux session named for the account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A first call finding a sign-in already waiting answers that sign-in's address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code is typed into the waiting sign-in, and the session goes once it answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A login that lands pushes the account's new credential onto its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A credential signed in as another person than the account's is refused at the push.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer to a code carries what the account's sign-in status says after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code with no sign-in waiting for it is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account no page is filed for is a fault of the data.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No answer carries a code, a token or a credential.",
    },
  ],
  name: "login",
  arguments: [
    { argument: "argument/account", required: true },
    { argument: "argument/login-code", required: false },
  ],
} as const satisfies Command
