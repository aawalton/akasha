"use client"

import type { SentenceMark } from "@akasha/voice-core/voice/mark-schema"
import { createContext, type ReactNode, useContext } from "react"

export interface SentenceNarrationValue {
  readonly marks: readonly SentenceMark[]
  readonly playFromSentence: (sentenceIndex: number) => void
}

const INERT: SentenceNarrationValue = { marks: [], playFromSentence: () => {} }

const SentenceNarrationContext = createContext<SentenceNarrationValue>(INERT)

export function SentenceNarrationProvider({
  value,
  children,
}: {
  value: SentenceNarrationValue
  children: ReactNode
}) {
  return <SentenceNarrationContext value={value}>{children}</SentenceNarrationContext>
}

export function useSentenceNarration(): SentenceNarrationValue {
  return useContext(SentenceNarrationContext)
}
