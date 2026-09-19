import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const alanAppShell = {
  id: "01a0655d-dab8-7853-9f9b-b95d2c8ee8a0",
  type: "page-type/module",
  slug: "alan-app-shell",
  definition: "the frame every signed-in page of Alan's site is drawn inside",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This shell is shipped inside the native WebView as well as served to a browser.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A browser signs out by posting, because a cookie the server set is the server's to clear.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The native shell signs out in the WebView, because it serves no route to post to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Signing out clears the session wherever the auth mode keeps the session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a person lands after a session ends is decided by the auth provider alone.",
    },
  ],
} as const satisfies Module
