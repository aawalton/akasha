import type { Module } from "@akasha/code/module"

export const alanAppShell = {
  id: "01a0655d-dab8-7853-9f9b-b95d2c8ee8a0",
  pageTypeSlug: "module",
  slug: "alan-app-shell",
  definition: "the frame every signed-in page of Alan's site is drawn inside",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Signing out happens in the browser rather than as a form POST.",
    },
    {
      invariantKind: "departure",
      statement: "This shell is shipped inside the native WebView as well as served to a browser.",
    },
    {
      invariantKind: "departure",
      statement: "Signing out clears the session wherever the auth mode keeps it.",
    },
    {
      invariantKind: "departure",
      statement: "Where a person lands after a session ends is decided by the auth provider alone.",
    },
  ],
} as const satisfies Module
