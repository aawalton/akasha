import { z } from "zod"

export const QUEST_STATUSES = ["active", "complete"] as const
export const QuestStatusSchema = z.enum(QUEST_STATUSES)
export type QuestStatus = z.infer<typeof QuestStatusSchema>

export const StoredQuestStatusSchema = z.preprocess(
  (value) => (value === "offered" ? "active" : value),
  QuestStatusSchema
)

export const QuestSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    objective: z.string(),
    conditions: z.array(z.string()).optional(),
    reward: z.string().optional(),
    status: StoredQuestStatusSchema,
  })
  .strict()
export type Quest = z.infer<typeof QuestSchema>
