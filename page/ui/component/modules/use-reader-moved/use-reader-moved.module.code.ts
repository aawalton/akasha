"use client"

import { type RefObject, useEffect, useRef } from "react"

const READER_INPUTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const

export function useReaderMoved(resetKey: string): RefObject<boolean> {
  const movedRef = useRef(false)
  useEffect(() => {
    movedRef.current = false
    const moved = () => {
      movedRef.current = true
    }
    for (const input of READER_INPUTS) {
      window.addEventListener(input, moved, { passive: true, capture: true })
    }
    return () => {
      for (const input of READER_INPUTS) {
        window.removeEventListener(input, moved, { capture: true })
      }
    }
  }, [resetKey])
  return movedRef
}
