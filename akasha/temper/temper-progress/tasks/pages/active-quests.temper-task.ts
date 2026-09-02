import type { TemperTask } from "../temper-task.page-type.ts"

export const activeQuests = {
  id: "01a05fd3-6983-78f1-98eb-2ef405622fde",
  pageTypeSlug: "temper-task",
  slug: "active-quests",
  title: "Active Quests",
  icon: "file-text",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "all_characters",
  priority: "p3",
  completionCardId: "active-quests",
} as const satisfies TemperTask
