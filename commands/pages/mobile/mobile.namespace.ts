import type { Namespace } from "../../namespaces/namespace.page-type.ts"

export const mobile = {
  id: "01a07bc2-afbe-7a85-ba01-366f93a9c7a1",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "mobile",
  definition: "the iOS apps Alan runs and what puts a build in front of him",
  parts: [
    "namespace/mobile-cut",
    "command/mobile-deploy-device",
    "namespace/mobile-sim",
    "command/mobile-testflight-status",
  ],
} as const satisfies Namespace
