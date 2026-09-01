import { z } from "zod"
import type { RevealedSheet } from "../revealed/revealed.module.code.ts"

export const QuestWindowSchema = z
  .object({
    id: z.string().optional(),
    title: z.string(),
    objective: z.string(),
    reward: z.string().optional(),
  })
  .strict()
export type QuestWindow = z.infer<typeof QuestWindowSchema>

export const ItemAwardDescriptorSchema = z
  .object({
    label: z.string(),
    value: z.string(),
  })
  .strict()
export type ItemAwardDescriptor = z.infer<typeof ItemAwardDescriptorSchema>

export const ItemAwardSchema = z
  .object({
    id: z.string().optional(),
    item: z.string(),
    descriptors: z.array(ItemAwardDescriptorSchema).optional(),
  })
  .strict()
export type ItemAward = z.infer<typeof ItemAwardSchema>

export const StatusAssessmentSchema = z
  .object({
    name: z.string(),
    level: z.number().optional(),
    class: z.string().optional(),
    attributes: z.record(z.string(), z.number()).optional(),
    pools: z.record(z.string(), z.number()).optional(),
  })
  .strict()
export type StatusAssessment = z.infer<typeof StatusAssessmentSchema>

export const TalentActivationSchema = z
  .object({
    holder: z.string(),
    talent: z.string(),
    status: z.string(),
    note: z.string().optional(),
  })
  .strict()
export type TalentActivation = z.infer<typeof TalentActivationSchema>

export const SystemChoiceOptionSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    detail: z.string().optional(),
  })
  .strict()
export type SystemChoiceOption = z.infer<typeof SystemChoiceOptionSchema>

export const SystemChoiceSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    prompt: z.string().optional(),
    options: z.array(SystemChoiceOptionSchema).min(1),
    selectedOptionId: z.string().optional(),
  })
  .strict()
export type SystemChoice = z.infer<typeof SystemChoiceSchema>

const SystemWindowUnion = z.discriminatedUnion("type", [
  z.object({ type: z.literal("quest-added"), quest: QuestWindowSchema }).strict(),
  z.object({ type: z.literal("quest-complete"), quest: QuestWindowSchema }).strict(),
  z.object({ type: z.literal("item-award"), award: ItemAwardSchema }).strict(),
  z.object({ type: z.literal("status-assessment"), assessment: StatusAssessmentSchema }).strict(),
  z.object({ type: z.literal("talent-activation"), activation: TalentActivationSchema }).strict(),
  z.object({ type: z.literal("system-choice"), choice: SystemChoiceSchema }).strict(),
  z
    .object({ type: z.literal("level-up"), level: z.number(), attrPoints: z.number().optional() })
    .strict(),
  z.object({ type: z.literal("skill"), skill: z.string(), rank: z.string().optional() }).strict(),
  z.object({ type: z.literal("affinity"), affinity: z.string() }).strict(),
  z.object({ type: z.literal("class"), class: z.string() }).strict(),
  z.object({ type: z.literal("title"), title: z.string() }).strict(),
])

export const SystemWindowSchema = z.preprocess((value) => {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    const record: Record<string, unknown> = { ...value }
    if (record.type === "quest-offer") return { ...record, type: "quest-added" }
  }
  return value
}, SystemWindowUnion)
export type SystemWindow = z.infer<typeof SystemWindowUnion>
export const SYSTEM_WINDOW_TYPES = [
  "quest-added",
  "quest-complete",
  "item-award",
  "status-assessment",
  "talent-activation",
  "system-choice",
  "level-up",
  "skill",
  "affinity",
  "class",
  "title",
] as const

export function deriveStatusAssessment(
  sheet: RevealedSheet,
  pools?: Record<string, number>
): StatusAssessment {
  const attributes: Record<string, number> = {}
  for (const [key, value] of Object.entries(sheet.attributes ?? {})) {
    if (typeof value === "number") attributes[key] = value
  }
  return StatusAssessmentSchema.parse({
    name: sheet.name ?? sheet.kind,
    ...(sheet.level !== undefined ? { level: sheet.level } : {}),
    ...(sheet.class !== undefined ? { class: sheet.class } : {}),
    ...(Object.keys(attributes).length > 0 ? { attributes } : {}),
    ...(pools !== undefined && Object.keys(pools).length > 0 ? { pools } : {}),
  })
}
