import type { Namespace } from "../../namespaces/namespace.page-type.types.ts"

export const mobile = {
  id: "01a07bc2-afbe-7a85-ba01-366f93a9c7a1",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "mobile",
  definition: "the simulator an iOS app is driven on, and what is known of the builds Apple holds",
  parts: ["namespace/mobile-cut", "namespace/mobile-sim", "command/mobile-testflight-status"],
} as const satisfies Namespace
