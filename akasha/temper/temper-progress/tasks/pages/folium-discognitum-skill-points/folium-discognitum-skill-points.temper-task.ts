import type { TemperTask } from "../../temper-task.page-type.ts"

export const foliumDiscognitumSkillPoints = {
  id: "019e8de6-ad2f-7cb0-90aa-4e45f07aec54",
  pageTypeSlug: "temper-task",
  slug: "folium-discognitum-skill-points",
  title: "Folium Discognitum Skill Points",
  icon: "file-text",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  character: "rafaema-coloseuvia",
  scope: "all_characters",
  priority: "p3",
  dueDate: "2026-08-19",
  completionCardId: "skill-points",
  completionItemPath: ["general", "foliumDiscognitum"],
  lastCompletedAt: "2026-08-19T17:11:47.000Z",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  progressTotal: 40,
  progressCurrent: 18,
  progress: "jsonl",
} as const satisfies TemperTask
