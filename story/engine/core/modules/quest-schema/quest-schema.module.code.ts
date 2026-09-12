import { z } from "zod"

const QUEST_STATUSES = ["active", "complete"] as const
const QuestStatusSchema = z.enum(QUEST_STATUSES)
export type QuestStatus = z.infer<typeof QuestStatusSchema>

const StoredQuestStatusSchema = z.preprocess(
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
