import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorToggleNodeDelay = {
  id: "01a18481-2b94-705b-81d0-6fd875867fba",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-toggle-node-delay",
  title: "Toggle Node Wait Time",
  key: "HOUSING_EDITOR_TOGGLE_NODE_DELAY",
  layer: "housing-editor",
  bindings: [{ slot: 1, key: "KEY_I" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
