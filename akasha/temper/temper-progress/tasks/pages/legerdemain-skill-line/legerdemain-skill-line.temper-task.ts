import type { TemperTask } from "../../temper-task.page-type.ts"

export const legerdemainSkillLine = {
  id: "01a05fd3-698a-7a2e-8bb9-c12cebb34d0b",
  pageTypeSlug: "temper-task",
  slug: "legerdemain-skill-line",
  title: "Legerdemain Skill Line",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  character: "yvlon-byres",
  effectiveCharacter: "belavierr",
  esoCharacterId: "8796093038720681",
  scope: "next_character",
  priority: "p2",
  dueDate: "2026-08-21",
  displayOrder: 10,
  completionCardId: "skill-lines",
  completionItemPath: ["111"],
  lastCompletedAt: "2026-08-20T12:07:56.000Z",
  rruleRule: "FREQ=DAILY;INTERVAL=1",
  rruleAnchorFromCompletion: false,
  progressTotal: 400,
  progressCurrent: 291,
  progress: "jsonl",
} as const satisfies TemperTask
