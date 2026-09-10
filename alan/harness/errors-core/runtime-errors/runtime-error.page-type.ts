import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { ErrorApp } from "./properties/error-app.text-property.ts"
import type { ErrorCount } from "./properties/error-count.number-property.ts"
import type { ErrorFingerprint } from "./properties/error-fingerprint.text-property.ts"
import type { ErrorFirstSeenAt } from "./properties/error-first-seen-at.instant-property.ts"
import type { ErrorKind } from "./properties/error-kind.text-property.ts"
import type { ErrorLastSeenAt } from "./properties/error-last-seen-at.instant-property.ts"
import type { ErrorMessage } from "./properties/error-message.text-property.ts"
import type { ReleaseSha } from "./properties/error-release-sha.text-property.ts"
import type { Url } from "./properties/error-url.text-property.ts"
import type { UserAgent } from "./properties/error-user-agent.text-property.ts"

export type RuntimeError = Page & {
  fingerprint: ErrorFingerprint
  app: ErrorApp
  kind: ErrorKind
  message: ErrorMessage
  url?: Url
  userAgent: UserAgent
  releaseSha?: ReleaseSha
  firstSeenAt: ErrorFirstSeenAt
  lastSeenAt?: ErrorLastSeenAt
  count?: ErrorCount
}

export const runtimeError = {
  id: "01a05f3f-e3df-76da-ba22-9282e49c2d98",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "runtime-error",
  definition: "one fault a client met, gathered under the fingerprint the fault hashes to",
  pluralSlug: "runtime-errors",
  extends: ["page-type/page"],
  mortal: true,
  parts: [
    "instant-property/error-first-seen-at",
    "instant-property/error-last-seen-at",
    "number-property/error-count",
    "text-property/error-app",
    "text-property/error-fingerprint",
    "text-property/error-kind",
    "text-property/error-message",
    "text-property/error-release-sha",
    "text-property/error-url",
    "text-property/error-user-agent",
  ],
  properties: [
    { pageProperty: "text-property/error-fingerprint", required: true, many: false },
    { pageProperty: "text-property/error-app", required: true, many: false },
    { pageProperty: "text-property/error-kind", required: true, many: false },
    { pageProperty: "text-property/error-message", required: true, many: false },
    { pageProperty: "text-property/error-url", required: false, many: false },
    { pageProperty: "text-property/error-user-agent", required: true, many: false },
    { pageProperty: "text-property/error-release-sha", required: false, many: false },
    { pageProperty: "instant-property/error-first-seen-at", required: true, many: false },
    {
      pageProperty: "instant-property/error-last-seen-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "number-property/error-count",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One page gathers every report sharing one fingerprint.",
    },
    {
      invariantKind: "departure",
      statement: "A page's slug is the app that met the error joined to the fingerprint.",
    },
    {
      invariantKind: "departure",
      statement: "A fingerprint alone is no export name.",
    },
    {
      invariantKind: "departure",
      statement: "The fields the first report had are the fields the commit has.",
    },
    {
      invariantKind: "departure",
      statement: "How often and how recently an error was met is kept outside the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A later report raises the count and leaves the committed body alone.",
    },
    {
      invariantKind: "departure",
      statement: "Filing an error again commits nothing.",
    },
    {
      invariantKind: "gap",
      statement: "A fresh checkout has no count for any error.",
    },
    {
      invariantKind: "absence",
      statement: "No stack reaches a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nobody who met an error is named here.",
    },
    {
      invariantKind: "gap",
      statement: "A message or a url could have a secret.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a secret out of the fields a report carried.",
    },
    {
      invariantKind: "departure",
      statement: "An error page goes once the fault the page reports is gone.",
    },
    {
      invariantKind: "absence",
      statement: "Whether anyone has looked at an error is said nowhere here.",
    },
  ],
} as const satisfies PageType
