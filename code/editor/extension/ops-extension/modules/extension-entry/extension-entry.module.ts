import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const extensionEntry = {
  id: "01a0680b-7175-7003-911e-8a75aa9ad7d4",
  type: "module",
  slug: "extension-entry",
  definition: "what the editor calls to start the panels, and what each start is recorded as",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The editor calls one function to start everything.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every panel is named here with the start that brings that panel up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every start runs to one deadline.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One bun process answers this window apart from any other window's process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The command server is heard before any panel starts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A window closing while starting takes its command server with that window.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The server's own stdin closing reaps that server where this host is killed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The observation store is named for the window's own process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The store is handed the host's own fetch, and writes nowhere without one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The store is dropped when the editor stops.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each start's outcome is recorded as an observation under the panel's name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A panel that did not start is named to Alan once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rest of the panels are said to be running.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows the contents a panel draws.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing runs when the editor stops.",
    },
  ],
  reachedByPath: ["activate", "deactivate"],
} as const satisfies Module
