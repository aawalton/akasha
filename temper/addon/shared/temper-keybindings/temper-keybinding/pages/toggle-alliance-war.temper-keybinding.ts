import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleAllianceWar = {
  id: "01a18481-2b97-79fa-b41e-f8995db25ad4",
  type: "page-type/temper-keybinding",
  slug: "toggle-alliance-war",
  key: "TOGGLE_ALLIANCE_WAR",
  bindings: [{ slot: 1, key: "KEY_L" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
