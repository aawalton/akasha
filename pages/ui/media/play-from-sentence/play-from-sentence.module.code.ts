import type { PlayingSessionState } from "@akasha/pages-ui/media/playing-session"
import type { SentenceMark } from "@akasha/voice-core/voice/mark-schema"

export type PlayFromSentencePlan =
  | { readonly kind: "play"; readonly seconds: number }
  | { readonly kind: "ungenerated"; readonly startSentenceIndex: number }

export function planPlayFromSentence(
  marks: readonly SentenceMark[],
  sentenceIndex: number
): PlayFromSentencePlan {
  const mark = marks[sentenceIndex]
  if (mark == null) return { kind: "ungenerated", startSentenceIndex: sentenceIndex }
  return { kind: "play", seconds: mark.startSec }
}

export function shouldSeekInPlace(
  state: PlayingSessionState,
  target: { readonly pageId: string; readonly variant: string }
): boolean {
  return (
    state.status === "active" && state.pageId === target.pageId && state.variant === target.variant
  )
}
