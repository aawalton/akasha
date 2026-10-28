import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const cmxReportToggle = {
  id: "01a18481-2b90-766b-8261-3ba58eeff21c",
  type: "page-type/temper-keybinding",
  slug: "cmx-report-toggle",
  key: "CMX_REPORT_TOGGLE",
  bindings: [{ slot: 1, key: "KEY_F12" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
