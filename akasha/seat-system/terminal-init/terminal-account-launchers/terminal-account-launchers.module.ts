import type { Module } from "@akasha/code-system/module"

export const terminalAccountLaunchers = {
  id: "01a0680a-fa30-7d9b-a049-f3d2011c5f5f",
  pageTypeSlug: "module",
  slug: "terminal-account-launchers",
  definition: "the shell opening a client on one claude account in the terminal it was typed in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A client opened this way seats nothing and holds no tmux session.",
    },
    {
      invariantKind: "departure",
      statement: "A client is reached through the pty proxy rather than run directly.",
    },
    {
      invariantKind: "departure",
      statement: "The terminal is reset once the client ends, whatever the client ended with.",
    },
    {
      invariantKind: "departure",
      statement: "What the client ended with is what the launcher ends with.",
    },
    {
      invariantKind: "departure",
      statement: "A new account is named and given an address before any client opens on it.",
    },
    {
      invariantKind: "departure",
      statement: "A new account named as nothing ends the launcher rather than opening a client.",
    },
    {
      invariantKind: "departure",
      statement: "A new account's own alias stands only once the set is composed again.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts a seat.",
    },
  ],
} as const satisfies Module
