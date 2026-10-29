import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const specialMoveSprint = {
  id: "01a18481-2b96-7a08-acf3-6c3dd6598c80",
  type: "page-type/temper-keybinding",
  slug: "special-move-sprint",
  title: "Sprint",
  key: "SPECIAL_MOVE_SPRINT",
  layer: "general",
  category: "combat",
  bindings: [
    { slot: 1, key: "KEY_SHIFT" },
    { slot: 3, key: "KEY_F3" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
