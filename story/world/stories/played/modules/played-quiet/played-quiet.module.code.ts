"use client"

import { useEffect, useState } from "react"

const QUIET_TICK_MS = 15_000

type Quiet = { readonly key: string | null; readonly since: number }

export function useQuietFor(key: string | null, working: boolean): number {
  const [quiet, setQuiet] = useState<Quiet>(() => ({ key, since: Date.now() }))
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    setQuiet({ key, since: Date.now() })
  }, [key, working])
  useEffect(() => {
    if (key === null) return
    const ticking = setInterval(() => {
      setNow(Date.now())
    }, QUIET_TICK_MS)
    return () => {
      clearInterval(ticking)
    }
  }, [key])
  if (working || quiet.key !== key) return 0
  return Math.max(0, now - quiet.since)
}
