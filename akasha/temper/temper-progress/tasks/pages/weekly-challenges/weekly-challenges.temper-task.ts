import type { TemperTask } from "../../temper-task.page-type.ts"

export const weeklyChallenges = {
  id: "019f9420-7fe5-7a60-8791-99f0d72cd040",
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
