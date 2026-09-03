import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const extensionEntry = {
  id: "01a0680b-7175-7003-911e-8a75aa9ad7d4",
  pageTypeSlug: "module",
  slug: "extension-entry",
  definition: "what the editor calls to start the panels, and what each start is recorded as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The editor calls one function to start everything.",
    },
    {
      invariantKind: "departure",
      statement: "Every panel is named here with the start that brings it up.",
    },
    {
      invariantKind: "departure",
      statement: "Every start runs to one deadline.",
    },
    {
      invariantKind: "departure",
      statement: "One bun process answers this window, apart from any other window's.",
    },
    {
      invariantKind: "departure",
      statement: "The command server is heard before any panel starts.",
    },
    {
      invariantKind: "departure",
      statement: "A window closing while starting takes its command server with it.",
    },
    {
      invariantKind: "departure",
      statement: "The server's own stdin closing reaps it where this host is killed.",
    },
    {
      invariantKind: "departure",
      statement: "The observation store is named for the window's own process.",
    },
    {
      invariantKind: "departure",
      statement: "The store is dropped when the editor stops.",
    },
    {
      invariantKind: "departure",
      statement: "Each start's outcome is recorded as an observation under the panel's name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A panel that did not start is named to Alan once, with the rest said to be running.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a panel draws.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing runs when the editor stops.",
    },
  ],
} as const satisfies Module
