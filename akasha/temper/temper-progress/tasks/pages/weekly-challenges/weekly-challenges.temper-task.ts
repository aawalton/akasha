import type { TemperTask } from "../../temper-task.page-type.ts"

export const weeklyChallenges = {
  id: "01a05fd3-698c-77c3-8f0b-d92ffe8d06b8",
  pageTypeSlug: "temper-task",
  slug: "weekly-challenges",
  title: "Weekly Challenges",
  icon: "file-text",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  character: "erin-solstice",
  scope: "character",
  priority: "p3",
  dueDate: "2026-08-25",
  lastCompletedAt: "2026-08-18T17:07:30.670Z",
  rruleRule: "FREQ=WEEKLY;BYDAY=TU",
  rruleAnchorFromCompletion: false,
} as const satisfies TemperTask
