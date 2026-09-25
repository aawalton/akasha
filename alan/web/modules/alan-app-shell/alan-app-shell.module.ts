import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const alanAppShell = {
  id: "01a0655d-dab8-7853-9f9b-b95d2c8ee8a0",
  type: "page-type/module",
  slug: "alan-app-shell",
  definition: "the signed-in page frame of Alan's site",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This shell is shipped inside the native WebView as well as served to a browser.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The native WebView is served the same site a browser is, and the same routes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A sign-out posts to the route that ends it, in the native WebView as in a browser.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Signing out clears the session wherever the auth mode keeps the session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a person lands after a session ends is decided by the auth provider alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every item this shell draws in its navigation is a nav page, and none is in code.",
    },
  ],
} as const satisfies Module
