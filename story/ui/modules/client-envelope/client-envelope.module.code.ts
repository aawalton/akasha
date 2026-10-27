import {
  ClientBeatSchema,
  ClientHudSchema,
  ClientQuestSchema,
  ClientSheetSchema,
} from "akasha/story/ui/modules/client-session/client-session.module.code.ts"
import {
  ClientStoryChapterSchema,
  ClientStoryTurnSchema,
} from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import { z } from "zod"

export interface PendingActionInput {
  readonly text: string
  readonly submittedAt: number
}

const ClientPendingActionSchema = z
  .object({
    text: z.string(),
    submittedAt: z.number(),
  })
  .strict()

const SessionEnvelopeSchema = z
  .object({
    title: z.string(),
    chapterProse: z.array(ClientStoryTurnSchema).optional(),
    beatLog: z.array(ClientBeatSchema).nullable().optional(),
    hud: ClientHudSchema.nullable().optional(),
    quests: z.array(ClientQuestSchema).nullable().optional(),
    sheet: ClientSheetSchema.nullable().optional(),
    storySoFar: z.array(ClientStoryChapterSchema).optional(),
    actionBox: z.array(ClientPendingActionSchema).optional(),
  })
  .strict()
export type SessionEnvelope = z.infer<typeof SessionEnvelopeSchema>
