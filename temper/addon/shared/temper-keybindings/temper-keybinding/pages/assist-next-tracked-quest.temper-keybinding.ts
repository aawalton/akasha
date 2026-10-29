import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const assistNextTrackedQuest = {
  id: "01a18481-2b90-7cec-abf7-34c8fb48d5fe",
  type: "page-type/temper-keybinding",
  slug: "assist-next-tracked-quest",
  title: "Cycle Tracked Activity",
  key: "ASSIST_NEXT_TRACKED_QUEST",
  layer: "general",
  category: "user-interface",
  bindings: [
    { slot: 1, key: "KEY_T" },
    { slot: 2, key: "KEY_GAMEPAD_DPAD_RIGHT" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
