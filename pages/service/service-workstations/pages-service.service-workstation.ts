import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const pagesService = {
  id: "01a05a43-5afa-7d0d-8d60-dbd3c3498f99",
  type: "service-workstation",
  slug: "pages-service",
  definition: "the service answering page queries and landing page writes",
  runs: ["bun pages/service/page-listening/page-listening.module.code.ts"],
  starts: [{ code: "module/page-listening" }],
  enabled: true,
  port: 8787,
  binds: ["127.0.0.1", "::1", "workstation.alanwalton.ts.net"],
  systemd: {
    restartDelaySeconds: 1,
    startLimitIntervalSeconds: 0,
  },
} as const satisfies ServiceWorkstation
