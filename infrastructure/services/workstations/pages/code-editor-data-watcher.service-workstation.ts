import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const codeEditorDataWatcher = {
  id: "01a07266-d473-76a3-bf19-f74baaa4efdf",
  pageTypeSlug: "service-workstation",
  type: "service-workstation",
  slug: "code-editor-data-watcher",
  definition: "the service keeping true what each part of the code editor draws",
  runs: ["bun alan/harness/code-editor/data-interfaces/data-watching/data-watching.module.code.ts"],
  starts: [{ code: "module/data-watching" }],
  enabled: true,
  systemd: {
    restartDelaySeconds: 5,
  },
} as const satisfies ServiceWorkstation
