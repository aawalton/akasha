import type { Page } from "../../../../pages/page.page-type.types.ts"
import type { ErrorApp } from "./properties/error-app.text-property.ts"
import type { ErrorCount } from "./properties/error-count.number-property.ts"
import type { ErrorFingerprint } from "./properties/error-fingerprint.text-property.ts"
import type { ErrorFirstSeenAt } from "./properties/error-first-seen-at.instant-property.ts"
import type { ErrorKind } from "./properties/error-kind.text-property.ts"
import type { ErrorLastSeenAt } from "./properties/error-last-seen-at.instant-property.ts"
import type { ErrorMessage } from "./properties/error-message.text-property.ts"
import type { ErrorReleaseSha } from "./properties/error-release-sha.text-property.ts"
import type { ErrorUrl } from "./properties/error-url.text-property.ts"
import type { ErrorUserAgent } from "./properties/error-user-agent.text-property.ts"

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
