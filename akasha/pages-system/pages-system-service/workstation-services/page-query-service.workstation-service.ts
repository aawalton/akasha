import type { WorkstationService } from "../../../service-system/workstation-service/workstation-service.page-type.ts"

export const pageQueryService = {
  id: "01a05a43-5afa-7d0d-8d60-dbd3c3498f99",
  pageTypeSlug: "workstation-service",
  slug: "page-query-service",
  definition: "the service answering page queries and landing page writes",
  runs: [
    "bun akasha/pages-system/pages-system-service/page-listening/page-listening.module.code.ts",
  ],
  enabled: true,
  port: 8787,
  binds: ["127.0.0.1", "::1", "workstation.alanwalton.ts.net"],
  systemd: {
    restartDelaySeconds: 1,
  },
} as const satisfies WorkstationService
