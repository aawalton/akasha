import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const useSynergy = {
  id: "01a18481-2b9a-7d33-8296-e0eea15e703f",
  type: "page-type/temper-keybinding",
  slug: "use-synergy",
  title: "Use Synergy",
  key: "USE_SYNERGY",
  layer: "general",
  category: "combat",
  bindings: [
    { slot: 1, key: "KEY_X" },
    { slot: 2, key: "KEY_GAMEPAD_BOTH_BUTTON_2_BUTTON_4" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
