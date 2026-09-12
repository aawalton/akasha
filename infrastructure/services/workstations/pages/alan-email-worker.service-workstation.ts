import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const alanEmailWorker = {
  id: "01a06829-0193-7263-a1e4-d14db047d74d",
  type: "service-workstation",
  slug: "alan-email-worker",
  definition: "the service deciding Alan's mail against his email rules",
  runs: ["bun alan/harness/email-watch/inbox-watching/inbox-watching.module.code.ts"],
  enabled: true,
  needsSecrets: true,
  systemd: {
    restartDelaySeconds: 10,
  },
} as const satisfies ServiceWorkstation
