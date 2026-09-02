import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useState } from "react"
import type { ClientStoryChapter } from "../client-story-session/client-story-session.module.code.ts"

export function StorySoFar({
  chapters,
  className,
}: {
  chapters: readonly ClientStoryChapter[]
  className?: string
}) {
  const [expanded, setExpanded] = useState(false)
  if (chapters.length === 0) return null

  return (
    <aside className={`flex flex-col gap-3${className === undefined ? "" : ` ${className}`}`}>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full cursor-pointer items-center gap-3 text-[10px] text-tertiary uppercase tracking-[0.32em] hover:text-accent"
      >
        <span className={`h-px flex-1 ${surfaceClass(3)}`} />
        the story so far
        <span aria-hidden="true">{expanded ? "▾" : "▸"}</span>
        <span className={`h-px flex-1 ${surfaceClass(3)}`} />
      </button>
      {expanded ? (
        <ul className="flex flex-col gap-1.5">
          {chapters.map((ch) => (
            <li key={ch.id}>
              <a
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-read text-[15px] text-secondary underline-offset-2 hover:text-accent hover:underline"
              >
                {ch.title}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  )
}
