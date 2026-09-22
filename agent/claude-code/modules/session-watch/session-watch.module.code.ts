import { existsSync, readdirSync } from "node:fs"
import { stat } from "node:fs/promises"
import { readTranscriptSessionId } from "akasha/agent/claude-code/modules/session-jsonl/session-jsonl.module.code.ts"
import { transcriptOf } from "akasha/agent/seat/session/modules/seat-transcript-path/seat-transcript-path.module.code.ts"
import { sessionOf } from "akasha/agent/seat/session/seat-session.module.code.ts"
import { keepSeatTranscript } from "akasha/agent/seat/supervisor/supervisor-ticking/modules/supervisor-heartbeat-beat/supervisor-heartbeat-beat.module.code.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

const FALLBACK_AFTER_MS = 15_000

const DISCOVER_INTERVAL_MS = 2_000

const SESSION_ID_PROBE_BYTES = 256 * 1024

async function transcriptSessionId(filePath: string): Promise<string | null> {
  try {
    return readTranscriptSessionId(await Bun.file(filePath).slice(0, SESSION_ID_PROBE_BYTES).text())
  } catch {
    return null
  }
}

async function newestJsonlAfter(projDir: string, startedAt: number): Promise<string | null> {
  if (!existsSync(projDir)) return null
  let newest: { name: string; mtimeMs: number } | null = null
  for (const name of readdirSync(projDir).filter((one) => one.endsWith(".jsonl"))) {
    const seen = await stat(`${projDir}/${name}`).catch(() => null)
    if (seen === null || seen.mtimeMs < startedAt - 5_000) continue
    if (newest === null || seen.mtimeMs > newest.mtimeMs) newest = { name, mtimeMs: seen.mtimeMs }
  }
  return newest === null ? null : `${projDir}/${newest.name}`
}

export function watchSessionFile(agentId: string, _sessionId: string, projDir: string): () => void {
  let stopped = false
  const startedAt = Date.now()
  const refused = new Set<string>()

  const beginWatching = async (path: string, via: "seat" | "fallback"): Promise<boolean> => {
    if (refused.has(path)) return false
    const own = sessionOf(agentId)?.value ?? null
    const held = await transcriptSessionId(path)
    if (own !== null && held !== null && held !== own) {
      refused.add(path)
      console.error(
        `[session-watch] REFUSING ${via} bind for agent ${agentId}: candidate ${path} holds session ${held} but this agent owns session ${own} — cross-agent transcript wiring prevented (#13186)`
      )
      return false
    }
    keepSeatTranscript(agentId, path)
    console.log(`[session-watch] found ${path} (via ${via})`)
    return true
  }

  let discovering = false
  const discoverInterval = setInterval(() => {
    if (stopped) {
      clearInterval(discoverInterval)
      return
    }
    if (discovering) return
    discovering = true
    void (async () => {
      try {
        const stated = transcriptOf(agentId)
        if (stated !== null) {
          if (existsSync(stated.value)) {
            if (await beginWatching(stated.value, "seat")) clearInterval(discoverInterval)
          }
          return
        }
        if (Date.now() - startedAt < FALLBACK_AFTER_MS) return
        const newest = await newestJsonlAfter(projDir, startedAt)
        if (newest === null) return
        console.log("[session-watch] the seat states no transcript — using newest-jsonl fallback")
        if (await beginWatching(newest, "fallback")) clearInterval(discoverInterval)
      } catch (err) {
        console.error("[session-watch] discovery error:", err)
      } finally {
        discovering = false
      }
    })()
  }, DISCOVER_INTERVAL_MS)

  return () => {
    stopped = true
    clearInterval(discoverInterval)
  }
}
