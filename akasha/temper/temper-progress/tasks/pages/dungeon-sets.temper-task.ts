import type { TemperTask } from "../temper-task.page-type.ts"

export const dungeonSets = {
  id: "01a05fd3-6988-7704-83ee-455ac9fdfbf9",
  pageTypeSlug: "temper-task",
  slug: "dungeon-sets",
  title: "Dungeon Sets",
  icon: "file-text",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "all_characters",
  priority: "p3",
  completionCardId: "dungeon-sets",
} as const satisfies TemperTask
