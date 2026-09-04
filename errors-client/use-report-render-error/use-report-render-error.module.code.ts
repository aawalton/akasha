"use client"

import { normalizeThrowable } from "@akasha/errors-core/throwable-normalizing"
import { useEffect, useRef } from "react"
import { reportError } from "../error-reporting/error-reporting.module.code.ts"
import type { ErrorApp } from "../global-error-capture/global-error-capture.module.code.ts"

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
