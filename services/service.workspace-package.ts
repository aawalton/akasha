import type { WorkspacePackage } from "@akasha/code/workspace-package"

export const service = {
  id: "01a05a3c-cafd-7ded-8901-f1468940d7ca",
  pageTypeSlug: "workspace-package",
  slug: "service",
  definition: "what the system runs without being asked each time",
  manifest: "json",
  parts: [
    "page-type/service",
    "page-type/workstation-service",
    "page-type/vendored-workload",
    "page-type/web-app",
    "page-type/secret",
    "workstation-service/service-watching",
  ],
} as const satisfies WorkspacePackage
