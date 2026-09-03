import type { TemperTask } from "../../temper-task.page-type.ts"

export const companionQuests = {
  id: "019e0394-18d8-7034-bda0-e7cc372eb80d",
  pageTypeSlug: "temper-task",
  slug: "companion-quests",
  title: "Companion Quests",
  icon: "file-text",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  character: "maviola-el",
  scope: "next_character",
  priority: "p3",
  dueDate: "2026-08-20",
  displayOrder: 14,
  completionCardId: "companion-quests",
  lastCompletedAt: "2026-08-19T17:15:19.609Z",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  progressTotal: 600,
  progressCurrent: 218,
  progress: "jsonl",
} as const satisfies TemperTask
