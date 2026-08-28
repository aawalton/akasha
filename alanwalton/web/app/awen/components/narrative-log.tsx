import { assertNever } from "@shared/utils-narrow/assert-never"
import type { RefObject } from "react"
import type { ClientBeat } from "../lib/client-session"
import { NewestDivider } from "./newest-divider"
import { SystemCard } from "./system-card"
import { SystemWindowCard } from "./system-window-card"

type NarrativeClientBeat = Extract<ClientBeat, { type: "narrative" }>
type SystemClientBeat = Extract<ClientBeat, { type: "system" }>

function NarrativeBeat({ beat, latest }: { beat: NarrativeClientBeat; latest: boolean }) {
  const paragraphs = beat.text.split(/\n\n+/).filter((p) => p.trim() !== "")
  return (
    <div
      className={`flex flex-col gap-[0.8em] font-read text-[18px] leading-[1.72] ${latest ? "" : "opacity-60"}`}
    >
      {paragraphs.map((p, i) => (
        <p key={i} className="text-primary">
          {p}
        </p>
      ))}
    </div>
  )
}

function SystemBeat({
  beat,
  latest,
  gameExternalId,
}: {
  beat: SystemClientBeat
  latest: boolean
  gameExternalId?: string
}) {
  if (beat.window !== undefined)
    return (
      <SystemWindowCard
        window={beat.window}
        gameExternalId={gameExternalId}
        windowId={beat.id != null ? String(beat.id) : undefined}
      />
    )
  return <SystemCard title={beat.title} lines={beat.lines} dim={!latest} />
}

function BeatView({
  beat,
  latest,
  gameExternalId,
}: {
  beat: ClientBeat
  latest: boolean
  gameExternalId?: string
}) {
  switch (beat.type) {
    case "narrative":
      return <NarrativeBeat beat={beat} latest={latest} />
    case "system":
      return <SystemBeat beat={beat} latest={latest} gameExternalId={gameExternalId} />
    default:
      return assertNever(beat)
  }
}

export function NarrativeLog({
  beats,
  gameExternalId,
  newestRef,
}: {
  beats: readonly ClientBeat[] | null
  gameExternalId?: string
  newestRef?: RefObject<HTMLDivElement | null>
}) {
  if (beats === null) {
    return <p className="font-read text-lg text-secondary">No session is live yet.</p>
  }
  const turns = beats.flatMap((b) => (b.turn !== undefined ? [b.turn] : []))
  const maxTurn = turns.length > 0 ? Math.max(...turns) : null
  const hasFrontier = maxTurn !== null
  let markDrawn = false
  return (
    <div className="flex flex-col gap-5">
      {beats.map((beat, index) => {
        const isLatest = hasFrontier && beat.turn === maxTurn
        const showMark = isLatest && !markDrawn
        if (showMark) markDrawn = true
        const bright = isLatest || !hasFrontier
        return (
          <div
            key={beat.id != null ? String(beat.id) : `beat-${index}`}
            ref={showMark ? newestRef : undefined}
            className="flex scroll-mt-[calc(var(--safe-area-top)+3.5rem)] flex-col gap-3"
          >
            {showMark ? <NewestDivider /> : null}
            <BeatView beat={beat} latest={bright} gameExternalId={gameExternalId} />
          </div>
        )
      })}
    </div>
  )
}
