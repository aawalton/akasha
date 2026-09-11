"use client"

import {
  type ErrorApp,
  setupGlobalErrorHandlers,
} from "akasha/alan/harness/errors-client/global-error-capture/global-error-capture.module.code.ts"
import { useEffect } from "react"

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
