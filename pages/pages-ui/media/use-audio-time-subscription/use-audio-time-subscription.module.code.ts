"use client"

import { type RefObject, useCallback, useEffect, useRef } from "react"

export function useAudioTimeSubscription(
  audioRef: RefObject<HTMLAudioElement | null>,
  active: unknown
): (listener: (currentTime: number) => void) => () => void {
  const listenersRef = useRef<Set<(currentTime: number) => void>>(new Set())

  const subscribeTime = useCallback(
    (listener: (currentTime: number) => void) => {
      const listeners = listenersRef.current
      listeners.add(listener)
      const el = audioRef.current
      if (el != null) listener(el.currentTime)
      return () => {
        listeners.delete(listener)
      }
    },
    [audioRef]
  )

  useEffect(() => {
    const el = audioRef.current
    if (el == null || active == null) return
    const fanOut = () => {
      const t = el.currentTime
      for (const listener of listenersRef.current) listener(t)
    }
    for (const ev of ["timeupdate", "seeked"] as const) el.addEventListener(ev, fanOut)
    return () => {
      for (const ev of ["timeupdate", "seeked"] as const) el.removeEventListener(ev, fanOut)
    }
  }, [audioRef, active])

  return subscribeTime
}
