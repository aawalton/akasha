import type { TemperTask } from "../../temper-task.page-type.ts"

export const darkBrotherhoodSkillLine = {
  id: "01a05fd3-6987-7753-b92f-f96485ace399",
  pageTypeSlug: "temper-task",
  slug: "dark-brotherhood-skill-line",
  title: "Dark Brotherhood Skill Line",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  character: "yvlon-byres",
  effectiveCharacter: "belavierr",
  scope: "next_character",
  priority: "p2",
  dueDate: "2026-08-21",
  displayOrder: 11,
  completionCardId: "skill-lines",
  completionItemPath: ["118"],
  lastCompletedAt: "2026-08-20T12:10:07.000Z",
  rruleRule: "FREQ=DAILY;INTERVAL=1",
  rruleAnchorFromCompletion: false,
  progressTotal: 240,
  progressCurrent: 151,
  progress: "jsonl",
} as const satisfies TemperTask
