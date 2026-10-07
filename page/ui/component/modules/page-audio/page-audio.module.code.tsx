"use client"

import { createContext, type ReactNode, useContext } from "react"

export type PageAudioAsked = {
  readonly pageTypeSlug: string
  readonly slug: string
}

type PageAudio = { readonly play: (asked: PageAudioAsked) => undefined }

const PageAudioContext = createContext<PageAudio | null>(null)

export function PageAudioProvider({
  audio,
  children,
}: {
  readonly audio: PageAudio
  readonly children: ReactNode
}) {
  return <PageAudioContext.Provider value={audio}>{children}</PageAudioContext.Provider>
}

export function usePageAudio(): PageAudio | null {
  return useContext(PageAudioContext)
}

type PageSpoken = {
  readonly pageId: string
  readonly from: number
  readonly to: number | null
}

const PageSpokenContext = createContext<PageSpoken | null>(null)

export function PageSpokenProvider({
  spoken,
  children,
}: {
  readonly spoken: PageSpoken | null
  readonly children: ReactNode
}) {
  return <PageSpokenContext.Provider value={spoken}>{children}</PageSpokenContext.Provider>
}

export function usePageSpoken(): PageSpoken | null {
  return useContext(PageSpokenContext)
}
