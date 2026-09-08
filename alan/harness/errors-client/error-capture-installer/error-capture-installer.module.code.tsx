"use client"

import { useEffect } from "react"
import {
  type ErrorApp,
  setupGlobalErrorHandlers,
} from "../global-error-capture/global-error-capture.module.code.ts"

export type ErrorCaptureInstallerProps = {
  readonly app: ErrorApp
  readonly getErrorUserId?: () => string | null
  readonly releaseSha?: string
  readonly shouldIgnoreRejection?: (reason: unknown) => boolean
}

export function ErrorCaptureInstaller({
  app,
  getErrorUserId,
  releaseSha,
  shouldIgnoreRejection,
}: ErrorCaptureInstallerProps): null {
  useEffect(() => {
    const dispose = setupGlobalErrorHandlers({
      app,
      getErrorUserId,
      releaseSha,
      shouldIgnoreRejection,
    })
    return dispose
  }, [app, getErrorUserId, releaseSha, shouldIgnoreRejection])

  return null
}
