import { ACTION_BAR_MESSAGE_KINDS } from "@alanwalton/awen-core/action-bar-message"
import { GameAlertsSchema, GameDisplayModulesSchema } from "@alanwalton/awen-core/game-schema"
import { frameConfigSchema } from "@shared/pages-core/schema/detail-config"
import { z } from "zod"
import {
  ClientBeatSchema,
  ClientHudSchema,
  ClientQuestSchema,
  ClientSheetSchema,
} from "./client-session"
import { ClientStoryChapterSchema, ClientStoryTurnSchema } from "./client-story-session"

export interface PendingActionInput {
  readonly text: string
  readonly submittedAt: number
}

export const ClientPendingActionSchema = z
  .object({
    text: z.string(),
    submittedAt: z.number(),
    kind: z.enum(ACTION_BAR_MESSAGE_KINDS),
  })
  .strict()
export type ClientPendingAction = z.infer<typeof ClientPendingActionSchema>

export const SessionEnvelopeSchema = z
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

export const ResolvedGameDisplaySchema = z
  .object({
    modules: GameDisplayModulesSchema,
    pollMs: z.number(),
    tagline: z.string().optional(),
    alerts: GameAlertsSchema.optional(),
    frame: frameConfigSchema.optional(),
  })
  .strict()

export const AwenDisplayPropsSchema = z
  .object({
    game: z
      .object({
        externalId: z.string(),
        title: z.string(),
        display: ResolvedGameDisplaySchema,
      })
      .strict(),
    initialEnvelope: SessionEnvelopeSchema,
  })
  .strict()
