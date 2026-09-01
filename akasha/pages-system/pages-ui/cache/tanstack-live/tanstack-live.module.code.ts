"use client"

import { BOOT_GATE_TIMEOUT_MS } from "@akasha/pages-ui/cache/boot-gate"
import type { ShapeDescriptor } from "@akasha/pages-ui-store/collection/shape-descriptor"
import type { PagesStore } from "@akasha/pages-ui-store/collection/store"
import { emitStoreDiagnostic } from "@akasha/pages-ui-store/diagnostics"
import { awaitPagesStoreReady, getPagesStore } from "@akasha/pages-ui-store/singleton"
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react"

type PagesCollection = PagesStore["collection"]

export interface LivePipeline<R> {
  readonly read: () => R
  readonly subscribe: (cb: () => undefined) => () => undefined
  readonly dispose: () => undefined
}

export interface AcquireResult {
  readonly ready: boolean
  readonly degraded: boolean
  readonly error: Error | null
}

export function useAcquireSlug(slug: string | undefined): AcquireResult {
  const [ready, setReady] = useState(slug === undefined)
  const [degraded, setDegraded] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const reqRef = useRef(0)

  useEffect(() => {
    if (slug === undefined) {
      setReady(true)
      setDegraded(false)
      setError(null)
      return
    }
    const reqId = ++reqRef.current
    let acquired = false
    let settled = false
    setReady(false)
    setDegraded(false)
    setError(null)
    const degradeTimer = setTimeout(() => {
      if (settled || reqId !== reqRef.current) return
      emitStoreDiagnostic({
        reason: "boot-gate-timeout",
        message: `[pages-cache] slug '${slug}' readiness overran ${BOOT_GATE_TIMEOUT_MS}ms — degrading to the empty state`,
        detail: `gate=${acquired ? `slug:${slug}` : "store-ready (env/hydrate)"} elapsed>=${BOOT_GATE_TIMEOUT_MS}ms acquired=${acquired}`,
      })
      setDegraded(true)
      setReady(true)
    }, BOOT_GATE_TIMEOUT_MS)
    void (async () => {
      try {
        const store = await awaitPagesStoreReady()
        if (reqId !== reqRef.current) return
        store.acquireSlug(slug)
        acquired = true
        await store.whenSlugReady(slug)
        if (reqId !== reqRef.current) return
        settled = true
        clearTimeout(degradeTimer)
        setDegraded(false)
        setReady(true)
      } catch (err) {
        if (reqId !== reqRef.current) return
        settled = true
        clearTimeout(degradeTimer)
        setError(err instanceof Error ? err : new Error(String(err)))
        setDegraded(false)
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
          store.releaseSlug(slug)
        } catch (err) {
          console.error("[pages-cache] releaseSlug failed", err)
        }
      })()
    }
  }, [slug])

  return { ready, degraded, error }
}

export function useAcquireSlugs(slugs: readonly string[] | undefined): AcquireResult {
  const unique = slugs === undefined ? [] : [...new Set(slugs.filter((s) => s.length > 0))].sort()
  const depsKey = unique.join("\0")
  const empty = unique.length === 0

  const [ready, setReady] = useState(empty)
  const [degraded, setDegraded] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const reqRef = useRef(0)

  useEffect(() => {
    if (empty) {
      setReady(true)
      setDegraded(false)
      setError(null)
      return
    }
    const acquiredSlugs = depsKey.split("\0")
    const reqId = ++reqRef.current
    let acquired = false
    let settled = false
    setReady(false)
    setDegraded(false)
    setError(null)
    const degradeTimer = setTimeout(() => {
      if (settled || reqId !== reqRef.current) return
      emitStoreDiagnostic({
        reason: "boot-gate-timeout",
        message: `[pages-cache] target slugs [${acquiredSlugs.join(", ")}] readiness overran ${BOOT_GATE_TIMEOUT_MS}ms — degrading to the empty state`,
        detail: `gate=target-slugs elapsed>=${BOOT_GATE_TIMEOUT_MS}ms acquired=${acquired}`,
      })
      setDegraded(true)
      setReady(true)
    }, BOOT_GATE_TIMEOUT_MS)
    void (async () => {
      try {
        const store = await awaitPagesStoreReady()
        if (reqId !== reqRef.current) return
        for (const slug of acquiredSlugs) store.acquireSlug(slug)
        acquired = true
        await Promise.all(acquiredSlugs.map((slug) => store.whenSlugReady(slug)))
        if (reqId !== reqRef.current) return
        settled = true
        clearTimeout(degradeTimer)
        setDegraded(false)
        setReady(true)
      } catch (err) {
        if (reqId !== reqRef.current) return
        settled = true
        clearTimeout(degradeTimer)
        setError(err instanceof Error ? err : new Error(String(err)))
        setDegraded(false)
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
          for (const slug of acquiredSlugs) store.releaseSlug(slug)
        } catch (err) {
          console.error("[pages-cache] releaseSlug (multi) failed", err)
        }
      })()
    }
  }, [depsKey, empty])

  return { ready, degraded, error }
}

export function useAcquireFilteredStream(descriptor: ShapeDescriptor | undefined): AcquireResult {
  const [ready, setReady] = useState(descriptor === undefined)
  const [error, setError] = useState<Error | null>(null)
  const reqRef = useRef(0)
  const shapeKey = descriptor?.shapeKey
  const depsKey = descriptor === undefined ? undefined : JSON.stringify(descriptor)

  useEffect(() => {
    if (descriptor === undefined || shapeKey === undefined) {
      setReady(true)
      setError(null)
      return
    }
    const reqId = ++reqRef.current
    let acquired = false
    setReady(false)
    setError(null)
    void (async () => {
      try {
        const store = await awaitPagesStoreReady()
        if (reqId !== reqRef.current) return
        store.acquireFilteredStream(descriptor)
        acquired = true
        await store.whenFilteredReady(shapeKey)
        if (reqId !== reqRef.current) return
        setReady(true)
      } catch (err) {
        if (reqId !== reqRef.current) return
        setError(err instanceof Error ? err : new Error(String(err)))
        setReady(true)
      }
    })()
    return () => {
      reqRef.current++
      if (!acquired) return
      void (async () => {
        try {
          const store = await getPagesStore()
          store.releaseFilteredStream(shapeKey)
        } catch (err) {
          console.error("[pages-cache] releaseFilteredStream failed", err)
        }
      })()
    }
  }, [depsKey, shapeKey])

  return { ready, degraded: false, error }
}

export interface PipelineLiveResult<R> {
  readonly snapshot: R | null
  readonly error: Error | null
}

const EMPTY_PIPELINE_RESULT: PipelineLiveResult<never> = { snapshot: null, error: null }

function toError(thrown: unknown): Error {
  return thrown instanceof Error ? thrown : new Error(String(thrown))
}

export function usePipelineLive<R>(
  makePipeline: (collection: PagesCollection) => LivePipeline<R>,
  depsKey: string,
  enabled: boolean
): PipelineLiveResult<R> {
  const makeRef = useRef(makePipeline)
  makeRef.current = makePipeline

  const stateRef = useRef<PipelineLiveResult<R>>(EMPTY_PIPELINE_RESULT)
  const listenersRef = useRef<Set<() => void>>(new Set())
  const notify = useCallback(() => {
    for (const listener of listenersRef.current) listener()
  }, [])

  const readInto = useCallback((built: LivePipeline<R>) => {
    try {
      stateRef.current = { snapshot: built.read(), error: null }
    } catch (thrown) {
      const error = toError(thrown)
      const isNew =
        stateRef.current.error === null || stateRef.current.error.message !== error.message
      stateRef.current = { snapshot: null, error }
      if (isNew) {
        console.error("[pages-cache] pipeline read() threw — surfacing to the view", error)
        emitStoreDiagnostic({
          reason: "view-read-throw",
          message: "[pages-cache] pipeline read() threw",
          detail: error.stack ?? error.message,
        })
      }
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      stateRef.current = EMPTY_PIPELINE_RESULT
      notify()
      return
    }
    let cancelled = false
    let pipeline: LivePipeline<R> | null = null
    let unsubscribe: (() => undefined) | null = null
    void (async () => {
      let degradeTimer: ReturnType<typeof setTimeout> | null = null
      const bootTimeout = new Promise<PagesStore>((resolve) => {
        degradeTimer = setTimeout(() => {
          degradeTimer = null
          if (cancelled) return
          emitStoreDiagnostic({
            reason: "boot-gate-timeout",
            message: `[pages-cache] store readiness overran ${BOOT_GATE_TIMEOUT_MS}ms — building the pipeline over the current collection`,
            detail: `gate=store-ready (env/hydrate) elapsed>=${BOOT_GATE_TIMEOUT_MS}ms`,
          })
          void getPagesStore().then(resolve)
        }, BOOT_GATE_TIMEOUT_MS)
      })
      const store = await Promise.race([
        awaitPagesStoreReady().then((s) => {
          if (degradeTimer !== null) {
            clearTimeout(degradeTimer)
            degradeTimer = null
          }
          return s
        }),
        bootTimeout,
      ])
      if (cancelled) return
      const built = makeRef.current(store.collection)
      pipeline = built
      readInto(built)
      unsubscribe = built.subscribe((): undefined => {
        if (cancelled) return undefined
        readInto(built)
        notify()
        return undefined
      })
      notify()
    })()
    return () => {
      cancelled = true
      if (unsubscribe !== null) unsubscribe()
      if (pipeline !== null) pipeline.dispose()
    }
  }, [depsKey, enabled, notify, readInto])

  const subscribe = useCallback((listener: () => void) => {
    listenersRef.current.add(listener)
    return () => {
      listenersRef.current.delete(listener)
    }
  }, [])
  const getSnapshot = useCallback((): PipelineLiveResult<R> => stateRef.current, [])

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
