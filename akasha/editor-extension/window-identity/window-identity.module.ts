import type { Module } from "../../code-system/modules/module.page-type.ts"

export const windowIdentity = {
  id: "01a064e4-627c-7ce5-80a9-ec7e71522da3",
  pageTypeSlug: "module",
  slug: "window-identity",
  definition: "the pid and start time a window is known by and the test that window still runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A window is known by its pid together with the moment that process started.",
    },
    {
      invariantKind: "departure",
      statement: "A pid is used again by a new process once the process holding that pid ends.",
    },
    {
      invariantKind: "departure",
      statement: "Two windows are the same where the pid and the start time both match.",
    },
    {
      invariantKind: "departure",
      statement: "A window compared against nothing matches nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The command name is skipped by seeking the last closing bracket in the status.",
    },
    {
      invariantKind: "departure",
      statement: "The start time is the twentieth field after the command name in the status.",
    },
    {
      invariantKind: "departure",
      statement: "A field that is no finite number leaves the start time unread.",
    },
    {
      invariantKind: "departure",
      statement: "A status that cannot be read leaves the start time at zero.",
    },
    {
      invariantKind: "departure",
      statement: "A window whose start time is zero is live wherever the pid still runs.",
    },
    {
      invariantKind: "departure",
      statement: "A window is live where the pid reports the start time recorded for that window.",
    },
    {
      invariantKind: "departure",
      statement: "A record is named for the pid alone rather than for the start time as well.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows which pid the editor window is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a window record holds.",
    },
  ],
} as const satisfies Module
