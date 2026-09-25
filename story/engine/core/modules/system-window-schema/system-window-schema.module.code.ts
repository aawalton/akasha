import { z } from "zod"

const QuestWindowSchema = z
  .object({
    id: z.string().optional(),
    title: z.string(),
    objective: z.string(),
    reward: z.string().optional(),
  })
  .strict()
export type QuestWindow = z.infer<typeof QuestWindowSchema>

const ItemAwardDescriptorSchema = z
  .object({
    label: z.string(),
    value: z.string(),
  })
  .strict()

const ItemAwardSchema = z
  .object({
    id: z.string().optional(),
    item: z.string(),
    descriptors: z.array(ItemAwardDescriptorSchema).optional(),
  })
  .strict()
export type ItemAward = z.infer<typeof ItemAwardSchema>

const StatusAssessmentSchema = z
  .object({
    name: z.string(),
    level: z.number().optional(),
    class: z.string().optional(),
    attributes: z.record(z.string(), z.number()).optional(),
    pools: z.record(z.string(), z.number()).optional(),
  })
  .strict()
export type StatusAssessment = z.infer<typeof StatusAssessmentSchema>

const TalentActivationSchema = z
  .object({
    holder: z.string(),
    talent: z.string(),
    status: z.string(),
    note: z.string().optional(),
  })
  .strict()
export type TalentActivation = z.infer<typeof TalentActivationSchema>

const SystemChoiceOptionSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    detail: z.string().optional(),
  })
  .strict()

const SystemChoiceSchema = z
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
