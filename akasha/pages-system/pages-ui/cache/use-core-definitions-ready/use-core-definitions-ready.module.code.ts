"use client"

import { BOOT_GATE_TIMEOUT_MS } from "@akasha/pages-ui/cache/boot-gate"
import { emitStoreDiagnostic } from "@akasha/pages-ui-store/diagnostics"
import { awaitPagesStoreReady, getPagesStore } from "@akasha/pages-ui-store/singleton"
import { useEffect, useRef, useState } from "react"

export const CORE_DEFINITION_SLUGS = ["page-type", "page-property-definition"] as const

export function useCoreDefinitionsReady(): boolean {
  const [ready, setReady] = useState(false)
  const reqRef = useRef(0)

  useEffect(() => {
    const reqId = ++reqRef.current
    let acquired = false
    let settled = false
    setReady(false)
    const degradeTimer = setTimeout(() => {
      if (settled || reqId !== reqRef.current) return
      emitStoreDiagnostic({
        reason: "boot-gate-timeout",
        message: `[pages-cache] core definitions [${CORE_DEFINITION_SLUGS.join(", ")}] readiness overran ${BOOT_GATE_TIMEOUT_MS}ms — degrading to the empty state`,
        detail: `gate=core-definitions elapsed>=${BOOT_GATE_TIMEOUT_MS}ms acquired=${acquired}`,
      })
      setReady(true)
    }, BOOT_GATE_TIMEOUT_MS)
    void (async () => {
      try {
        const store = await awaitPagesStoreReady()
        if (reqId !== reqRef.current) return
        for (const slug of CORE_DEFINITION_SLUGS) store.acquireSlug(slug)
        acquired = true
        await Promise.all(CORE_DEFINITION_SLUGS.map((slug) => store.whenSlugReady(slug)))
        if (reqId !== reqRef.current) return
        settled = true
        clearTimeout(degradeTimer)
        setReady(true)
      } catch {
        if (reqId !== reqRef.current) return
        settled = true
        clearTimeout(degradeTimer)
        setReady(true)
      }
    })()
    return () => {
      reqRef.current++
      clearTimeout(degradeTimer)
      if (!acquired) return
      void (async () => {
        try {
          const store = await getPagesStore()
          for (const slug of CORE_DEFINITION_SLUGS) store.releaseSlug(slug)
        } catch (err) {
          console.error("[pages-cache] core-definitions release failed", err)
        }
      })()
    }
  }, [])

  return ready
}
