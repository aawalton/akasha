import type { ErrorApp } from "akasha/alan/harness/errors-core/runtime-errors/properties/error-app.text-property.types.ts"
import type { ErrorCount } from "akasha/alan/harness/errors-core/runtime-errors/properties/error-count.number-property.types.ts"
import type { ErrorFingerprint } from "akasha/alan/harness/errors-core/runtime-errors/properties/error-fingerprint.text-property.types.ts"
import type { ErrorFirstSeenAt } from "akasha/alan/harness/errors-core/runtime-errors/properties/error-first-seen-at.instant-property.types.ts"
import type { ErrorKind } from "akasha/alan/harness/errors-core/runtime-errors/properties/error-kind.text-property.types.ts"
import type { ErrorLastSeenAt } from "akasha/alan/harness/errors-core/runtime-errors/properties/error-last-seen-at.instant-property.types.ts"
import type { ErrorMessage } from "akasha/alan/harness/errors-core/runtime-errors/properties/error-message.text-property.types.ts"
import type { ErrorReleaseSha } from "akasha/alan/harness/errors-core/runtime-errors/properties/error-release-sha.text-property.types.ts"
import type { ErrorUrl } from "akasha/alan/harness/errors-core/runtime-errors/properties/error-url.text-property.types.ts"
import type { ErrorUserAgent } from "akasha/alan/harness/errors-core/runtime-errors/properties/error-user-agent.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

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
