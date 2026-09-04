import type { Module } from "@akasha/code-system/module"

export const playingSessionContext = {
  id: "01a06205-4f3b-7002-b0b3-fc943629740e",
  pageTypeSlug: "module",
  slug: "playing-session-context",
  definition:
    "The playing session shared with everything below it: what is playing, where, and its controls.",
  code: "tsx",
} as const satisfies Module
