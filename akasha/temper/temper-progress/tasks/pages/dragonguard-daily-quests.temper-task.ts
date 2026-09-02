import type { TemperTask } from "../temper-task.page-type.ts"

export const dragonguardDailyQuests = {
  id: "01a05fd3-6988-7457-9ef0-42043029af91",
  pageTypeSlug: "temper-task",
  slug: "dragonguard-daily-quests",
  title: "Dragonguard Daily Quests",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  character: "lyonette-du-marquin",
  effectiveCharacter: "archmage-amerys",
  scope: "all_characters",
  priority: "p3",
  dueDate: "2026-08-19",
  displayOrder: 7,
  completionCardId: "character-achievements",
  completionItemPath: ["Dragonhold", "Quests", "2612"],
  lastCompletedAt: "2026-08-19T12:16:26.000Z",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  progressTotal: 600,
  progressCurrent: 327,
  progress: "jsonl",
} as const satisfies TemperTask
