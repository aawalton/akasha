"use client"

import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { usePlayingSession } from "@akasha/pages-ui/media/playing-session-context"
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react"
import { useNavigate } from "react-router"

const SEEK_SECONDS = 30

export function MiniPlayerBar() {
  const { state, isPaused, seekBy, togglePlay } = usePlayingSession()
  const navigate = useNavigate()

  if (state.status !== "active") return null

  return (
    <div
      data-testid="mini-player-bar"
      className={`sticky top-(--safe-area-top) z-40 flex items-center gap-2 border-primary/10 border-b px-3 py-2 ${surfaceClass(2)}`}
    >
      <button
        type="button"
        data-testid="mini-player-jump-back"
        onClick={() => navigate(state.pageHref)}
        title="Go to the playing chapter"
        className="flex min-w-0 flex-1 items-center gap-2 text-left"
      >
        <span className="truncate text-primary text-sm">{state.title}</span>
      </button>
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          data-testid="mini-player-back-30"
          aria-label="Back 30 seconds"
          onClick={() => seekBy(-SEEK_SECONDS)}
          className="flex items-center rounded-md p-1.5 text-secondary transition-colors hover:bg-primary/5 hover:text-primary"
        >
          <RotateCcw className="size-4" />
        </button>
        <button
          type="button"
          data-testid="mini-player-play-pause"
          aria-label={isPaused ? "Play" : "Pause"}
          aria-pressed={!isPaused}
          onClick={togglePlay}
          className="flex items-center rounded-md p-1.5 text-secondary transition-colors hover:bg-primary/5 hover:text-primary"
        >
          {isPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
        </button>
        <button
          type="button"
          data-testid="mini-player-forward-30"
          aria-label="Forward 30 seconds"
          onClick={() => seekBy(SEEK_SECONDS)}
          className="flex items-center rounded-md p-1.5 text-secondary transition-colors hover:bg-primary/5 hover:text-primary"
        >
          <RotateCw className="size-4" />
        </button>
      </div>
    </div>
  )
}
