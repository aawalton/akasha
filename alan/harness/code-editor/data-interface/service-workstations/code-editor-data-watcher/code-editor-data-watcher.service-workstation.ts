import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const codeEditorDataWatcher = {
  id: "01a07266-d473-76a3-bf19-f74baaa4efdf",
  type: "page-type/service-workstation",
  slug: "code-editor-data-watcher",
  definition: "the service keeping true what each part of the code editor draws",
  enabled: true,
  systemd: {
    restartDelaySeconds: 5,
  },
} as const satisfies ServiceWorkstation
