import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const googleSignOut = {
  id: "01a18d88-b247-7bdb-b04c-a0963f5bb07c",
  type: "page-type/module",
  slug: "google-sign-out",
  definition: "how code ends a sign-in session",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Better Auth states the cookies ending a session, and they are read off its answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session that will not end hands back no cookie rather than an error.",
    },
  ],
  createdAt: "2026-10-30T15:58:28.422Z",
  updatedAt: "2026-10-30T16:05:24.501Z",
} as const satisfies Module
