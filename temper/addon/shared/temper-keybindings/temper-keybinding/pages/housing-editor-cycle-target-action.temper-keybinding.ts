import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorCycleTargetAction = {
  id: "01a18481-2b92-7396-b967-3eac4214a410",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-cycle-target-action",
  title: "Cycle Target",
  key: "HOUSING_EDITOR_CYCLE_TARGET_ACTION",
  layer: "housing-editor",
  bindings: [
    { slot: 1, key: "KEY_TAB" },
    { slot: 2, key: "KEY_GAMEPAD_DPAD_RIGHT" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
