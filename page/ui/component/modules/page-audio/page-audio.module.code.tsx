"use client"

import { createContext, type ReactNode, useContext } from "react"

export type PageAudioAsked = {
  readonly pageTypeSlug: string
  readonly slug: string
}

export type PageAudio = { readonly play: (asked: PageAudioAsked) => undefined }

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
