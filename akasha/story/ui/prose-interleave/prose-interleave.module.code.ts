import { parseProseIntoRawSegments } from "@akasha/story-engine-core/prose-segments"
import type { ClientBeat } from "../client-session/client-session.module.code.ts"
import type {
  ClientProseSegment,
  ClientStoryTurn,
} from "../client-story-session/client-story-session.module.code.ts"

type SystemClientBeat = Extract<ClientBeat, { type: "system" }>

export interface TurnInterleaveMismatch {
  readonly turnId: string
  readonly turnNumber: number | undefined
  readonly reason: "count" | "malformed"
  readonly markerCount: number
  readonly beatCount: number
}

export interface TurnInterleave {
  readonly segments?: readonly ClientProseSegment[]
  readonly mismatch?: TurnInterleaveMismatch
}

function systemSegment(beat: SystemClientBeat): ClientProseSegment {
  return {
    kind: "system",
    ...(beat.title !== undefined ? { title: beat.title } : {}),
    ...(beat.lines !== undefined ? { lines: beat.lines } : {}),
    ...(beat.window !== undefined ? { window: beat.window } : {}),
    ...(beat.window?.type === "system-choice" && beat.id != null
      ? { windowId: String(beat.id) }
      : {}),
  }
}

export function interleaveTurnSegments(
  turn: ClientStoryTurn,
  turnSystemBeats: readonly SystemClientBeat[]
): TurnInterleave {
  let raw: ReturnType<typeof parseProseIntoRawSegments>
  try {
    raw = parseProseIntoRawSegments(turn.text)
  } catch {
    return {
      mismatch: {
        turnId: turn.id,
        turnNumber: turn.turnNumber,
        reason: "malformed",
        markerCount: 0,
        beatCount: turnSystemBeats.length,
      },
    }
  }

  const markerCount = raw.filter((s) => s.kind === "marker").length
  if (markerCount === 0) return {}

  const beatCount = turnSystemBeats.length
  if (markerCount !== beatCount) {
    const segments = raw.map(
      (s): ClientProseSegment =>
        s.kind === "prose" ? { kind: "prose", text: s.text } : { kind: "unavailable" }
    )
    return {
      segments,
      mismatch: {
        turnId: turn.id,
        turnNumber: turn.turnNumber,
        reason: "count",
        markerCount,
        beatCount,
      },
    }
  }

  let beatIndex = 0
  const segments = raw.map((s): ClientProseSegment => {
    if (s.kind === "prose") return { kind: "prose", text: s.text }
    const beat = turnSystemBeats[beatIndex]
    beatIndex += 1
    return beat !== undefined ? systemSegment(beat) : { kind: "unavailable" }
  })
  return { segments }
}
