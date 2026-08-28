"use client"

import { normalizeThrowable } from "../../errors-core/src/normalize-throwable"
import { useEffect, useRef } from "react"
import { reportError } from "./report-error"
import type { ErrorApp } from "./setup-global-error-handlers"

export function useReportRenderError(error: unknown, app: ErrorApp): undefined {
  const reportedRef = useRef<WeakSet<object>>(new WeakSet())

  useEffect(() => {
    if (error == null) return
    if (typeof error === "object") {
      if (reportedRef.current.has(error)) return
      reportedRef.current.add(error)
    }
    const { message, stack } = normalizeThrowable(error)
    reportError({
      message,
      stack,
      kind: "react-render",
      app,
      errorUserId: null,
    })
  }, [error, app])
}
