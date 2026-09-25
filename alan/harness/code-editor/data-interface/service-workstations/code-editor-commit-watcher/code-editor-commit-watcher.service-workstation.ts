import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const codeEditorCommitWatcher = {
  id: "01a0d99a-f5fe-73b0-a13c-06efac52c17c",
  type: "page-type/service-workstation",
  slug: "code-editor-commit-watcher",
  definition: "the service keeping true what the code editor draws from committed pages",
  enabled: true,
  systemd: {
    restartDelaySeconds: 5,
  },
} as const satisfies ServiceWorkstation
