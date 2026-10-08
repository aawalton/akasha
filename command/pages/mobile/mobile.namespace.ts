import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const mobile = {
  id: "01a07bc2-afbe-7a85-ba01-366f93a9c7a1",
  type: "page-type/namespace",
  slug: "mobile",
  definition: "the simulator an iOS app is driven on, and what is known of the builds Apple holds",
  parts: ["command/mobile-testflight-status", "namespace/mobile-cut", "namespace/mobile-sim"],
  name: "mobile",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A command under this namespace reports the work and mobile-cli does the work.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing under this namespace reaches the mac except through mobile-cli.",
    },
  ],
  createdAt: "2026-09-07T12:05:51.678Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Namespace
