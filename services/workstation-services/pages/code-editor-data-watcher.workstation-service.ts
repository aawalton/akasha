import type { WorkstationService } from "../workstation-service.page-type.types.ts"

export const codeEditorDataWatcher = {
  id: "01a07266-d473-76a3-bf19-f74baaa4efdf",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "code-editor-data-watcher",
  definition: "the service keeping true what each part of the code editor draws",
  runs: [
    "bun alan/harness/code-editor/code-editor-data-interfaces/data-watching/data-watching.module.code.ts",
  ],
  enabled: true,
  systemd: {
    restartDelaySeconds: 5,
  },
} as const satisfies WorkstationService
