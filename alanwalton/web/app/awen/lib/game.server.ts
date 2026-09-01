import { resolveChapterProseDials } from "@alanwalton/awen-core/display-defaults"
import { GameDisplayConfigSchema, type ResolvedGameDisplay, resolveGameDisplay } from "@alanwalton/awen-core/game-schema"
import { resolveRevealKeys } from "@alanwalton/awen-core/reveal-spec"
import { askComposed } from "@shared/pages-query/ask"
import { z } from "zod"

const AWEN_GAME_SLUG = "game"

export interface AwenGameConfig {
  readonly externalId: string
  readonly title: string
  readonly display: ResolvedGameDisplay
  readonly coordinatorAgent: string | null
  readonly mechanicsWeight?: string
  readonly currentSession: number
  readonly stateIds: readonly string[]
  readonly turnIds: readonly string[]
}

const RelationIdsSchema = z
  .array(z.unknown())
  .catch([])
  .transform((arr) => arr.filter((v): v is string => typeof v === "string"))

function toRelationIds(value: unknown): readonly string[] {
  return RelationIdsSchema.parse(value ?? [])
}

function withResolvedChapterProse(display: ResolvedGameDisplay): ResolvedGameDisplay {
  const declared = display.modules.chapterProse
  if (declared === undefined) return display
  const resolved = resolveChapterProseDials(declared)
  return {
    ...display,
    modules: {
      ...display.modules,
      chapterProse: { ...declared, titles: resolved.titles, pastTurns: resolved.pastTurns },
    },
  }
}

function withResolvedRevealKeys(display: ResolvedGameDisplay): ResolvedGameDisplay {
  const declared = display.modules.sheet
  if (declared === undefined) return display
  const resolved = resolveRevealKeys(declared.revealKeys)
  return {
    ...display,
    modules: {
      ...display.modules,
      sheet: { ...declared, revealKeys: [...resolved] },
    },
  }
}

function asCurrentSession(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value !== "" && Number.isFinite(Number(value))) {
    return Number(value)
  }
  return 1
}

export async function loadGame(externalId: string): Promise<AwenGameConfig | null> {
  const asked = await askComposed({
    "page-type": AWEN_GAME_SLUG,
    where: { "external-id": { is: externalId } },
    keys: [
      "title",
      "display-config",
      "game-engine",
      "coordinator-agent",
      "mechanics-weight",
      "current-session",
      "states",
      "turns",
    ],
    limit: 1,
  })
  if (!asked.ok) throw new Error(`loadGame: ${asked.why}`)
  const row = asked.answer.rows[0]
  if (row === undefined) return null
  const page = row.values

  const gameEngine = typeof page["game-engine"] === "string" ? page["game-engine"] : undefined
  const baseDisplay = resolveGameDisplay(
    GameDisplayConfigSchema.parse(page["display-config"] ?? {}),
    gameEngine
  )
  const display = withResolvedRevealKeys(withResolvedChapterProse(baseDisplay))
  const title = typeof page.title === "string" && page.title !== "" ? page.title : externalId
  const coordinatorAgent =
    typeof page["coordinator-agent"] === "string" ? page["coordinator-agent"] : null
  const mechanicsWeight =
    typeof page["mechanics-weight"] === "string" ? page["mechanics-weight"] : undefined
  const currentSession = asCurrentSession(page["current-session"])

  return {
    externalId,
    title,
    display,
    coordinatorAgent,
    mechanicsWeight,
    currentSession,
    stateIds: toRelationIds(page.states),
    turnIds: toRelationIds(page.turns),
  }
}
