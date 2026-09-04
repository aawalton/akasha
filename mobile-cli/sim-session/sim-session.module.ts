import type { Module } from "@akasha/code-system/module"

export const simSession = {
  id: "01a05cee-e560-7fa8-b30a-1b0defa5f6c3",
  pageTypeSlug: "module",
  slug: "sim-session",
  definition: "the state of the one live sim session, persisted to a file in the home directory",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The session record is at one fixed path in the home directory.",
    },
    {
      invariantKind: "departure",
      statement: "The session file is written with mode 0600.",
    },
    {
      invariantKind: "departure",
      statement: "A session file carrying an unrecognised field parses as null.",
    },
    {
      invariantKind: "constraint",
      statement: "XCUITest reports the app's WKWebView under the bundle id process-App.",
    },
    {
      invariantKind: "departure",
      statement: "The banner-tap capabilities are the sim capabilities with the bundle id dropped.",
    },
  ],
} as const satisfies Module
