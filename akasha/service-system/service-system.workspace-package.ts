import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const serviceSystem = {
  id: "01a05a3c-cafd-7ded-8901-f1468940d7ca",
  pageTypeSlug: "workspace-package",
  slug: "service-system",
  definition: "what the system runs without being asked each time",
  manifest: "json",
  partSlugs: [
    "page-type/service",
    "page-type/workstation-service",
    "page-type/cluster-service",
    "page-type/web-app",
    "module/unit-writing",
    "module/service-reaching",
    "module/file-following",
    "module/service-wrapping",
    "module/service-reading",
    "module/service-installing",
    "module/web-app-reading",
    "module/workload-deploying",
  ],
} as const satisfies WorkspacePackage
