"use client"

import { isComputed, isLiveFormulaConfig } from "@shared/pages-core/formula/resolve"
import { useEffect, useMemo, useState } from "react"
import type { PropertyDefinition } from "@shared/pages-core/types"

export function useLiveNow(defs: readonly PropertyDefinition[], liveRefreshMs?: number): number {
  const hasLiveField = useMemo(
    () => defs.some((d) => isComputed(d) && isLiveFormulaConfig(d.config)),
    [defs]
  )
  const [now, setNow] = useState(0)
  useEffect(() => {
    if (!hasLiveField) return
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), liveRefreshMs ?? 1000)
    return () => clearInterval(id)
  }, [hasLiveField, liveRefreshMs])
  return now
}
