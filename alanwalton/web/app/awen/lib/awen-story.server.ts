import { askComposed } from "@shared/pages-query/ask"
import { parseAwenStatePage } from "./awen-state-parse"
import type { AwenGameConfig } from "./game.server"
import { STORY_READER_BASE_URL } from "./game-config.server"
import type { StoryLedger } from "./session-envelope"
import { composeStorySession, pickLatestPublishedSnapshot } from "./story-session-compose"

const AWEN_TURN_SLUG = "game-turn"

function numberOf(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return undefined
}

export async function loadStoryLedger(game: AwenGameConfig): Promise<StoryLedger | null> {
  if (game.turnIds.length === 0) return null

  const asked = await askComposed({
    "page-type": AWEN_TURN_SLUG,
    where: { id: { in: game.turnIds } },
    keys: [
      "id",
      "turn-number",
      "status",
      "session-number",
      "text",
      "sheet-snapshot",
      "completed-at",
    ],
    "sort-by": "turn-number",
  })
  if (!asked.ok) throw new Error(`loadStoryLedger: ${asked.why}`)
  const rows = asked.answer.rows.map((r) => ({
    id: r.values.id,
    turnNumber: numberOf(r.values["turn-number"]),
    status: r.values.status,
    sessionNumber: numberOf(r.values["session-number"]),
    text: r.values.text,
    sheetSnapshot: r.values["sheet-snapshot"],
    completedAt: r.values["completed-at"],
  }))
  if (rows.length === 0) return null

  const ledger = composeStorySession({
    rows,
    currentSession: game.currentSession,
    readerBaseUrl: STORY_READER_BASE_URL ?? null,
    history: game.display.modules.chapterProse?.history ?? "session",
  })

  const snapshot = pickLatestPublishedSnapshot(rows)
  const publishedState =
    snapshot === null
      ? null
      : parseAwenStatePage({
          turn: snapshot.turn,
          hud: snapshot.hud,
          revealed: snapshot.revealed,
          build: snapshot.build,
          log: snapshot.log,
          chapters: snapshot.chapters,
          quests: snapshot.quests,
        })

  return { ...ledger, publishedState }
}
