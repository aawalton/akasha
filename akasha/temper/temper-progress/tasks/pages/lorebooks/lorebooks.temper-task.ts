import type { TemperTask } from "../../temper-task.page-type.ts"

export const lorebooks = {
  id: "01a05fd3-698a-7132-8b48-e6b982d50227",
  pageTypeSlug: "temper-task",
  slug: "lorebooks",
  title: "Lorebooks",
  icon: "file-text",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  character: "erin-solstice",
  scope: "character",
  priority: "p3",
  dueDate: "2026-08-28",
  displayOrder: 15,
  completionCardId: "lore-library-character",
  lastCompletedAt: "2026-08-27T13:18:14.000Z",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  progressTotal: 211,
  progressCurrent: 146,
} as const satisfies TemperTask
