import type { TemperTask } from "../temper-task.page-type.ts"

export const companionRapport = {
  id: "01a05fd3-6986-7db2-a875-fdf376278609",
  pageTypeSlug: "temper-task",
  slug: "companion-rapport",
  title: "Companion Rapport",
  icon: "file-text",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  character: "maviola-el",
  scope: "next_character",
  priority: "p3",
  dueDate: "2026-08-21",
  completionCardId: "companion-rapport-character",
  lastCompletedAt: "2026-08-20T12:47:21.000Z",
  rruleRule: "FREQ=DAILY;INTERVAL=1",
  rruleAnchorFromCompletion: false,
  progressTotal: 640000,
  progressCurrent: 79614,
  progress: "jsonl",
} as const satisfies TemperTask
