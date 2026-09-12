import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const mobile = {
  id: "01a07bc2-afbe-7a85-ba01-366f93a9c7a1",
  type: "namespace",
  slug: "mobile",
  definition: "the simulator an iOS app is driven on, and what is known of the builds Apple holds",
  parts: ["command/mobile-testflight-status", "namespace/mobile-cut", "namespace/mobile-sim"],
  name: "mobile",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command under this namespace reports the work and mobile-cli does the work.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing under this namespace reaches the mac except through mobile-cli.",
    },
  ],
} as const satisfies Namespace
