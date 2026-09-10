import type { ErrorReport } from "akasha/alan/harness/errors-core/error-report/error-report.module.code.ts"
import { normalizeThrowable } from "akasha/alan/harness/errors-core/throwable-normalizing/throwable-normalizing.module.code.ts"
import { reportError } from "../error-reporting/error-reporting.module.code.ts"

export type ErrorApp = ErrorReport["app"]

export type SetupGlobalErrorHandlersOptions = {
  readonly app: ErrorApp
  readonly getErrorUserId?: () => string | null
  readonly releaseSha?: string
  readonly shouldIgnoreRejection?: (reason: unknown) => boolean
}

const HANDLERS = { installed: false }

export function setupGlobalErrorHandlers(opts: SetupGlobalErrorHandlersOptions): () => undefined {
  if (typeof window === "undefined") return () => undefined
  if (HANDLERS.installed) return () => undefined
  HANDLERS.installed = true

  const { app, getErrorUserId, releaseSha, shouldIgnoreRejection } = opts
  const errorUserId = (): string | null => {
    try {
      return getErrorUserId?.() ?? null
    } catch {
      return null
    }
  }

  const previousOnError = window.onerror

  const onError = (
    event: Event | string,
    _source?: string,
    _lineno?: number,
    _colno?: number,
    error?: Error
  ): undefined => {
    const { message, stack } = normalizeThrowable(error ?? event)
    reportError({
      message,
      stack,
      kind: "error",
      app,
      errorUserId: errorUserId(),
      ...(releaseSha === undefined ? {} : { releaseSha }),
    })
  }

  const onUnhandledRejection = (event: PromiseRejectionEvent): undefined => {
    const reason: unknown = event.reason
    let ignore = false
    try {
      ignore = shouldIgnoreRejection?.(reason) === true
    } catch {
      ignore = false
    }
    if (ignore) {
      event.preventDefault()
      return
    }
    const { message, stack } = normalizeThrowable(reason)
    reportError({
      message,
      stack,
      kind: "unhandledrejection",
      app,
      errorUserId: errorUserId(),
      ...(releaseSha === undefined ? {} : { releaseSha }),
    })
  }

  window.onerror = onError
  window.addEventListener("unhandledrejection", onUnhandledRejection)

  return (): undefined => {
    window.removeEventListener("unhandledrejection", onUnhandledRejection)
    if (window.onerror === onError) window.onerror = previousOnError
    HANDLERS.installed = false
  }
}
