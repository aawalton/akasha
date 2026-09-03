import type { TemperTask } from "../../temper-task.page-type.ts"

export const infiniteArchiveWeeklyLeaderboard = {
  id: "019db533-f381-75b1-ae47-75a551046ec2",
  pageTypeSlug: "temper-task",
  slug: "infinite-archive-weekly-leaderboard",
  title: "Infinite Archive Weekly Leaderboard",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  character: "erin-solstice",
  effectiveCharacter: "erin-solstice",
  esoCharacterId: "8796093022338107",
  scope: "character",
  priority: "p2",
  dueDate: "2026-08-25",
  displayOrder: 14,
  lastCompletedAt: "2026-08-18T17:07:23.004Z",
  rruleRule: "FREQ=WEEKLY;BYDAY=TU",
  rruleAnchorFromCompletion: false,
} as const satisfies TemperTask
