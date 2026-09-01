import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { App } from "./properties/error-app.text-property.ts"
import type { Count } from "./properties/error-count.number-property.ts"
import type { Fingerprint } from "./properties/error-fingerprint.text-property.ts"
import type { FirstSeenAt } from "./properties/error-first-seen-at.instant-property.ts"
import type { Kind } from "./properties/error-kind.text-property.ts"
import type { LastSeenAt } from "./properties/error-last-seen-at.instant-property.ts"
import type { Message } from "./properties/error-message.text-property.ts"
import type { ReleaseSha } from "./properties/error-release-sha.text-property.ts"
import type { Url } from "./properties/error-url.text-property.ts"
import type { UserAgent } from "./properties/error-user-agent.text-property.ts"

export type Error = Page & {
  fingerprint: Fingerprint
  app: App
  kind: Kind
  message: Message
  url?: Url
  userAgent: UserAgent
  releaseSha?: ReleaseSha
  firstSeenAt: FirstSeenAt
  lastSeenAt?: LastSeenAt
  count?: Count
}

export const error = {
  id: "01a05f3f-e3df-76da-ba22-9282e49c2d98",
  pageTypeSlug: "page-type",
  slug: "error",
  definition: "one fault a client met, gathered under the fingerprint the fault hashes to",
  pluralSlug: "errors",
  extendsSlug: "page-type/page",
  mortal: true,
  partSlugs: [
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
    { pagePropertySlug: "error-fingerprint", required: true, many: false },
    { pagePropertySlug: "error-app", required: true, many: false },
    { pagePropertySlug: "error-kind", required: true, many: false },
    { pagePropertySlug: "error-message", required: true, many: false },
    { pagePropertySlug: "error-url", required: false, many: false },
    { pagePropertySlug: "error-user-agent", required: true, many: false },
    { pagePropertySlug: "error-release-sha", required: false, many: false },
    { pagePropertySlug: "error-first-seen-at", required: true, many: false },
    { pagePropertySlug: "error-last-seen-at", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "error-count", required: false, many: false, uncommitted: true },
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
      statement: "What the first report carried is what the commit holds.",
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
      statement: "A fresh checkout carries no count for any error.",
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
      statement: "A message or a url could carry a secret.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a secret out of what a report carried.",
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
