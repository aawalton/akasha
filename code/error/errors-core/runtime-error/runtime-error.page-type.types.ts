import type { ErrorApp } from "akasha/code/error/errors-core/runtime-error/properties/error-app.text-property.types.ts"
import type { ErrorCount } from "akasha/code/error/errors-core/runtime-error/properties/error-count.number-property.types.ts"
import type { ErrorFingerprint } from "akasha/code/error/errors-core/runtime-error/properties/error-fingerprint.text-property.types.ts"
import type { ErrorFirstSeenAt } from "akasha/code/error/errors-core/runtime-error/properties/error-first-seen-at.instant-property.types.ts"
import type { ErrorKind } from "akasha/code/error/errors-core/runtime-error/properties/error-kind.text-property.types.ts"
import type { ErrorLastSeenAt } from "akasha/code/error/errors-core/runtime-error/properties/error-last-seen-at.instant-property.types.ts"
import type { ErrorMessage } from "akasha/code/error/errors-core/runtime-error/properties/error-message.text-property.types.ts"
import type { ErrorReleaseSha } from "akasha/code/error/errors-core/runtime-error/properties/error-release-sha.text-property.types.ts"
import type { ErrorUrl } from "akasha/code/error/errors-core/runtime-error/properties/error-url.text-property.types.ts"
import type { ErrorUserAgent } from "akasha/code/error/errors-core/runtime-error/properties/error-user-agent.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type RuntimeError = Page & {
  fingerprint: ErrorFingerprint
  app: ErrorApp
  kind: ErrorKind
  message: ErrorMessage
  url?: ErrorUrl
  userAgent: ErrorUserAgent
  releaseSha?: ErrorReleaseSha
  firstSeenAt: ErrorFirstSeenAt
  lastSeenAt?: ErrorLastSeenAt
  count?: ErrorCount
}
