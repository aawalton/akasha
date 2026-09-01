import { z } from "zod"
import { QuestSchema } from "../quest-schema/quest-schema.module.code.ts"
import { RevealedSheetSchema } from "../revealed/revealed.module.code.ts"

export const HudSchema = z
  .object({
    level: z.number().optional(),
    pools: z.record(z.string(), z.number()).optional(),
    delta: z.record(z.string(), z.number()).optional(),
  })
  .strict()
export type Hud = z.infer<typeof HudSchema>

export const GmBootBeatSchema = z.object({
  text: z.string(),
  turn: z.number().optional(),
  type: z.string().optional(),
})
export type GmBootBeat = z.infer<typeof GmBootBeatSchema>

export const GameStateSchema = z
  .object({
    turn: z.number(),
    hud: HudSchema.optional(),
    revealed: RevealedSheetSchema.optional(),
    build: z.string().optional(),
    log: z.array(z.unknown()).optional(),
    chapters: z.array(z.unknown()).optional(),
    quests: z.array(QuestSchema).optional(),
  })
  .passthrough()
export type GameState = z.infer<typeof GameStateSchema>
