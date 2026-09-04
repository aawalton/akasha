import type { FrameConfig } from "@akasha/pages-core/schema/detail-config"
import { z } from "zod"
import { RevealKeySchema } from "../revealed/revealed.module.code.ts"

export const MECHANICS_WEIGHTS = ["zero", "light", "medium", "heavy"] as const
export const MechanicsWeightSchema = z.enum(MECHANICS_WEIGHTS)
export type MechanicsWeight = z.infer<typeof MechanicsWeightSchema>

export const CONTROLLED_ENTITY_KINDS = ["single", "party", "dungeon", "nation"] as const
export const ControlledEntityKindSchema = z.enum(CONTROLLED_ENTITY_KINDS)
export type ControlledEntityKind = z.infer<typeof ControlledEntityKindSchema>

export const RESOLUTIONS = ["none", "dice", "formula", "resource", "hybrid"] as const
export const ResolutionSchema = z.enum(RESOLUTIONS)
export type Resolution = z.infer<typeof ResolutionSchema>

export const GAME_GENRES = [
  "narrative",
  "litrpg",
  "ttrpg",
  "cultivation",
  "dungeon-core",
  "civilization",
  "superhero",
  "progression",
  "dark",
  "adventure",
] as const
export const GameGenreSchema = z.enum(GAME_GENRES)
export type GameGenre = z.infer<typeof GameGenreSchema>

export const GameRulebookSchema = z
  .object({
    systemType: z.string().optional(),
    summary: z.string().optional(),
    attributes: z.array(z.unknown()).optional(),
    progression: z.string().optional(),
    turnScale: z.string().optional(),
    goal: z.string().optional(),
  })
  .passthrough()
export type GameRulebook = z.infer<typeof GameRulebookSchema>

export const POOL_BAR_COLORS = ["red", "blue", "green"] as const
export const PoolBarColorSchema = z.enum(POOL_BAR_COLORS)
export type PoolBarColor = z.infer<typeof PoolBarColorSchema>

export const PoolPresentationSchema = z
  .object({
    key: z.string(),
    label: z.string(),
    color: PoolBarColorSchema,
    max: z.string().optional(),
  })
  .strict()
export type PoolPresentation = z.infer<typeof PoolPresentationSchema>

export const STORY_SO_FAR_SOURCES = ["turns", "stateLedger"] as const
export const StorySoFarSourceSchema = z.enum(STORY_SO_FAR_SOURCES)
export type StorySoFarSource = z.infer<typeof StorySoFarSourceSchema>

export const CHAPTER_PROSE_HISTORY_SCOPES = ["session", "full"] as const
export const ChapterProseHistorySchema = z.enum(CHAPTER_PROSE_HISTORY_SCOPES)
export type ChapterProseHistory = z.infer<typeof ChapterProseHistorySchema>

export const CHAPTER_PROSE_TITLES = ["shown", "hidden"] as const
export const ChapterProseTitlesSchema = z.enum(CHAPTER_PROSE_TITLES)
export type ChapterProseTitles = z.infer<typeof ChapterProseTitlesSchema>

export const CHAPTER_PROSE_PAST_TURNS = ["plain", "muted"] as const
export const ChapterProsePastTurnsSchema = z.enum(CHAPTER_PROSE_PAST_TURNS)
export type ChapterProsePastTurns = z.infer<typeof ChapterProsePastTurnsSchema>

export const GameDisplayModulesSchema = z
  .object({
    chapterProse: z
      .object({
        systemWindows: z.boolean().optional(),
        history: ChapterProseHistorySchema.optional(),
        titles: ChapterProseTitlesSchema.optional(),
        pastTurns: ChapterProsePastTurnsSchema.optional(),
      })
      .strict()
      .optional(),
    beatLog: z.object({ systemWindows: z.boolean().optional() }).strict().optional(),
    hud: z
      .object({ pools: z.array(PoolPresentationSchema).optional() })
      .strict()
      .optional(),
    quests: z.object({}).strict().optional(),
    sheet: z
      .object({ revealKeys: z.array(RevealKeySchema).optional() })
      .strict()
      .optional(),
    storySoFar: z.object({ source: StorySoFarSourceSchema }).strict().optional(),
    actionBox: z.object({}).strict().optional(),
  })
  .strict()
export type GameDisplayModules = z.infer<typeof GameDisplayModulesSchema>

export const ALERT_SOUND_PRESETS = ["chime", "bell", "pip"] as const
export const AlertSoundSchema = z.enum([...ALERT_SOUND_PRESETS, "off"])
export type AlertSound = z.infer<typeof AlertSoundSchema>

export const GameAlertsSchema = z
  .object({
    sound: AlertSoundSchema.optional(),
    desktop: z.boolean().optional(),
  })
  .strict()
export type GameAlerts = z.infer<typeof GameAlertsSchema>

export const GameDisplayConfigSchema = z
  .object({
    modules: GameDisplayModulesSchema,
    pollMs: z.number().int().positive(),
    tagline: z.string().optional(),
    alerts: GameAlertsSchema.optional(),
  })
  .strict()
export type GameDisplayConfig = z.infer<typeof GameDisplayConfigSchema>

export interface ResolvedGameDisplay {
  readonly modules: GameDisplayModules
  readonly pollMs: number
  readonly tagline?: string
  readonly alerts?: GameAlerts
  readonly frame?: FrameConfig
}

export function frameDefaultForEngine(gameEngine: string | undefined): FrameConfig | undefined {
  if (gameEngine === "awen")
    return { edgeToEdge: true, focusMode: true, autoScroll: { loadScroll: "new-top" } }
  return undefined
}

export function resolveGameDisplay(
  config: GameDisplayConfig,
  gameEngine?: string
): ResolvedGameDisplay {
  const frame = frameDefaultForEngine(gameEngine)
  return {
    modules: config.modules,
    pollMs: config.pollMs,
    ...(config.tagline !== undefined ? { tagline: config.tagline } : {}),
    ...(config.alerts !== undefined ? { alerts: config.alerts } : {}),
    ...(frame !== undefined ? { frame } : {}),
  }
}

export const DEFAULT_ALERT_SOUND: AlertSound = "chime"

export interface ResolvedAlertPrefs {
  readonly sound: AlertSound
  readonly desktop: boolean
}
export function resolveAlertPrefs(alerts: GameAlerts | undefined): ResolvedAlertPrefs {
  return {
    sound: alerts?.sound ?? DEFAULT_ALERT_SOUND,
    desktop: alerts?.desktop ?? true,
  }
}

export const GameConfigSchema = z.object({}).passthrough()
export type GameConfig = z.infer<typeof GameConfigSchema>
