export type ErrorCapturePayload = {
  fingerprint: string
  message: string
  stack: string
  kind: string
  app: string
  url: string
  userAgent: string
  releaseSha?: string
}

const NO_ERROR_PAGE_TYPE =
  "a capture read the error page already filed under a fingerprint, raised its count and wrote the whole page back. `@akasha/pages-system-service` answers for the pages akasha holds, and akasha declares no `error` page type, so there is no page to read and none to write."

const BELONGS =
  "Filing a client error as a page needs an `error` page type in akasha, and then a read and a write through `@akasha/pages-system-service`. Until that page type is declared, an error reaching this route goes nowhere."

export async function captureError(
  payload: ErrorCapturePayload,
  _writer?: string
): Promise<{ id: string }> {
  throw new Error(
    `captureError(${payload.fingerprint}): ${NO_ERROR_PAGE_TYPE} ${BELONGS} Nothing has been written, and how many times this has broken this way is unchanged.`
  )
}
