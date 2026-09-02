import type { TemperTask } from "../temper-task.page-type.ts"

export const craftingWrits = {
  id: "01a05fd3-6986-7108-abe1-1fc004faf5c7",
  pageTypeSlug: "temper-task",
  slug: "crafting-writs",
  title: "Crafting Writs",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "all_characters",
  priority: "p2",
  dueDate: "2026-08-26",
  displayOrder: 1,
  completionCardId: "daily-writs",
  lastCompletedAt: "2026-08-25T17:37:45.000Z",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  progressTotal: 140,
  progressCurrent: 98,
  progress: "jsonl",
} as const satisfies TemperTask
