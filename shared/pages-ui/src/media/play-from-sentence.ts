import type { SentenceMark } from "@alanwalton/voice-core/voice/mark-schema"
import type { PlayingSessionState } from "./playing-session"

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
