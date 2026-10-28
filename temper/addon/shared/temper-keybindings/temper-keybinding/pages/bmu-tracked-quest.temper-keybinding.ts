import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const bmuTrackedQuest = {
  id: "01a18481-2b90-7a79-b9f1-01b66ef728f3",
  type: "page-type/temper-keybinding",
  slug: "bmu-tracked-quest",
  key: "BMU_TRACKED_QUEST",
  bindings: [{ slot: 1, key: "KEY_PAGEDOWN" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-28T21:53:40.236Z",
} as const satisfies TemperKeybinding
