import type { TemperTask } from "../../temper-task.page-type.ts"

export const undauntedSkillLine = {
  id: "01a05fd3-698c-7fb5-aad9-5098ec602377",
  pageTypeSlug: "temper-task",
  slug: "undaunted-skill-line",
  title: "Undaunted Skill Line",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  character: "shaestrel",
  effectiveCharacter: "belavierr",
  esoCharacterId: "8796093025190173",
  scope: "next_character",
  priority: "p2",
  dueDate: "2026-08-21",
  displayOrder: 6,
  completionCardId: "skill-lines",
  completionItemPath: ["55"],
  lastCompletedAt: "2026-08-20T11:57:14.000Z",
  rruleRule: "FREQ=DAILY;INTERVAL=1",
  rruleAnchorFromCompletion: false,
  progressTotal: 200,
  progressCurrent: 171,
  progress: "jsonl",
} as const satisfies TemperTask
