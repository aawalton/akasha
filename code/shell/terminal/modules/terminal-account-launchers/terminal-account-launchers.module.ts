import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const terminalAccountLaunchers = {
  id: "01a0680a-fa30-7d9b-a049-f3d2011c5f5f",
  type: "page-type/module",
  slug: "terminal-account-launchers",
  definition: "the shell opening a client on a model account in its own terminal",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A client opened this way seats nothing and has no tmux session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A client is reached through the pty proxy rather than run directly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The terminal is reset once the client ends whatever status that client ended with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The launcher ends with the status the client ended with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A new account is named and given an address before any client opens on that account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new account named as nothing ends the launcher rather than opening a client.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new account's own alias is there only once the set is composed again.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here starts a seat.",
    },
  ],
} as const satisfies Module
